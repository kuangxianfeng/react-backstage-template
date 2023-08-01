import { AxiosRequestConfig as InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance, isCancel } from 'axios'
import sessionAccessor from 'utils/session-accessor'
import { ABORT_CONTROLLER_MAP, HTTP_CODE, MAX_RESEND_TIMES, REPEAT_REQUEST_WHITE_LIST } from './config'
import { generateSignalKey, failToastHandler, resendRequest, abortAllRequest, redirectUrl } from './utils'

/**
 * @description 全局 loading 控制，默认开启
 * @param config
 * @returns {InternalAxiosRequestConfig}
 */
function loadingInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if ((config._loading === undefined || config._loading)) {

    }
    return config
}

/**
 * @description 注入 token
 * @param config 请求 config 信息
 * @returns {InternalAxiosRequestConfig}
 */
function injectHeaderInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = sessionAccessor.get('token')
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
}

/**
 * @description 注入 AbortController 的拦截器，并且取消重复请求(以第一次的为准)
 * @param {InternalAxiosRequestConfig} config 请求 config 信息
 * @returns {InternalAxiosRequestConfig}
 */
function injectAbortControllerInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const { _bypassRepeatDetection, url } = config
    if (_bypassRepeatDetection || REPEAT_REQUEST_WHITE_LIST.includes(url!)) {
        return config
    }
    const controller = new AbortController()
    config.signal = controller.signal
    const signalMapKey = generateSignalKey(config)
    config._requestKey = signalMapKey
    const signalMapValue = ABORT_CONTROLLER_MAP.get(signalMapKey)
    if (signalMapValue) {
        controller.abort('取消请求')
    } else {
        url &&
            ABORT_CONTROLLER_MAP.set(signalMapKey, {
                url,
                abortController: controller
            })
    }
    return config
}

export const requestInterceptors = {
    loadingInterceptor,
    injectHeaderInterceptor,
    injectAbortControllerInterceptor
} as const

// 释放全局 loading
function releaseLoading() {
    console.log('releaseLoading')
}
/**
 * @description 释放 AbortController
 * @param {AxiosResponse} response 响应信息
 * @returns
 */
function releaseAbortControllerInterceptor<T extends API.BaseDataStructure>(response: AxiosResponse<T>): AxiosResponse<T> {
    const signalMapKey = response.config._requestKey
    signalMapKey && ABORT_CONTROLLER_MAP.delete(signalMapKey)
    return response
}

/**
 * @description 释放全局 loading
 * @param {AxiosResponse} response 响应信息
 * @returns {AxiosResponse}
 */
function releaseLoadingInterceptor<T extends API.BaseDataStructure>(response: AxiosResponse<T>): AxiosResponse<T> {
    if (ABORT_CONTROLLER_MAP.size === 0) {

    }
    return response
}

/**
 * @description 这个成功是 http 状态码为 200，区别于下面的 `responseSuccessInterceptor`
 * @param response
 * @returns
 */
function httpSuccessResponseInterceptor<T extends API.BaseDataStructure>(response: AxiosResponse<T>) {
    return response.status === HTTP_CODE.SUCCESS ? response : Promise.reject<AxiosResponse<T>>(response)
}

/**
 * @description 针对于 http-code 都不对的错误拦截
 * @param error
 */
function httpFailInterceptor<T extends API.BaseDataStructure>(error: AxiosError<T>, instance: AxiosInstance) {
    const { status, message, config, code } = error
    if (message?.includes('timeout') && code === 'ECONNABORTED' && config) {
        const signalMapKey = config._requestKey
        ABORT_CONTROLLER_MAP.get(signalMapKey) && ABORT_CONTROLLER_MAP.delete(signalMapKey)
        const { _currentRequestMaxResendTimes: c, _currentRequestCount } = config
        const maxResendTimes = c !== undefined ? c : MAX_RESEND_TIMES
        // 超时重发结束
        if (_currentRequestCount === maxResendTimes) {
            failToastHandler('请求超时，请联系管理员')
            return Promise.reject(error)
        }
        // 重新发起请求
        return resendRequest(instance, config)
    }
    // 取消的请求直接return，让请求处能 catch 到
    if (isCancel(error)) {
        return Promise.reject(error)
    }
    switch (status) {
        case HTTP_CODE.UNAUTHORIZED:
            failToastHandler('权限不足，请联系管理员')
            break
        case HTTP_CODE.NOT_FOUND:
            failToastHandler('接口未找到，请联系管理员')
            break
        case HTTP_CODE.SERVICE_ERROR:
            failToastHandler('服务器异常，请联系管理员')
            break
        case HTTP_CODE.NETWORK_ANOMALY:
            failToastHandler('网络异常')
            break
        default:
            failToastHandler('未知错误')
    }
    return Promise.reject(error)
}

/**
 * @description 此次请求真正成功，接口中的 `code≠200` 直接 `reject`
 * @description 做了自定义处理
 * @param response
 */
async function responseSuccessInterceptor<T extends API.BaseDataStructure>(response: AxiosResponse<T>) {
    const {
        config: { _customResponse, _lowCustomResponse, _targetedCustomResponse },
        data
    } = response
    if (_customResponse) {
        return response
    }
    if (data.code === HTTP_CODE.SUCCESS) {
        return data
    } if (_lowCustomResponse || _targetedCustomResponse?.includes(data.code)) {
        throw response;
    }
    if (HTTP_CODE.TOKEN_EXPIRED === data.code) {
        // 未登录、过期取消所有剩余请求
        abortAllRequest()
        // 释放全局 loading
        releaseLoading()
        redirectUrl(1)
    } else if (data.code === HTTP_CODE.USER_NOT_PERMISSIONS) {
        // 取消所有剩余请求
        abortAllRequest()
        // 释放全局 loading
        releaseLoading()
        // 用户无权限
        redirectUrl(2)
    }
    throw response;
}

/**
 * @description 针对请求后端接口status报错进入error处理
 * @param error
 */
export function responseFailInterceptor(error) {
    // 请求服务器报错之后，删除缓存的请求url链接，防止下一次请求被取消
    const signalMapKey = error.config._requestKey
    signalMapKey && ABORT_CONTROLLER_MAP.delete(signalMapKey)
    return Promise.reject(error)
}

export const responseInterceptors = {
    releaseLoadingInterceptor,
    releaseAbortControllerInterceptor,
    httpSuccessResponseInterceptor,
    responseSuccessInterceptor,
    httpFailInterceptor,
    responseFailInterceptor
} as const
