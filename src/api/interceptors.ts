import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import sessionAccessor from "../utils/session-accessor"
import { generateSignalKey } from "./utils"
import { HTTP_CODE, WHITE_LIST, ABORT_CONTROLLER_MAP, MAX_RESEND_TIMES, BASE_URL, TIME_OUT, CURRENT_REQUEST_COUNT } from "./config"

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    _currentRequestCount: CURRENT_REQUEST_COUNT
})

export type AxiosResponseType<T = any> = AxiosResponse<Api.BaseDataStructure<T>>
/**
 * 请求成功拦截器
 * @param config 请求 config 信息
 * @returns
 */
function requestSuccessInterceptor(config: AxiosRequestConfig) {
    return config
}
/**
 * 请求失败拦截器
 * @param config 请求 config 信息
 * @returns
 */
function requestFailInterceptor(error: AxiosError) {
    return Promise.reject(error)
}
/**
 * 是否开启 loading 拦截器
 * @param config 请求 config 信息
 * @returns
 */
function loadingInterceptor(config: AxiosRequestConfig) {
    if (config._loading === undefined || config._loading) {
        // 开启 loading
    }
    return config
}

/**
 * 注入 token 的拦截器
 * @param config 请求 config 信息
 * @returns
 */
function injectHeaderInterceptor(config: AxiosRequestConfig) {
    const token = sessionAccessor.get("token")
    if (token) {
        config.headers!.Authorization = `bearer ${token}`
    }
    return config
}

/**
 * 注入 abortController 的拦截器
 * @param config 请求 config 信息
 * @returns
 */
function injectAbortControllerInterceptor(config: AxiosRequestConfig) {
    if (config?._bypassRepeat || WHITE_LIST.includes(config.url!)) {
        return config
    }
    const controller = new AbortController()
    // 此次请求的唯一标识
    const signalMapKey = generateSignalKey(config)
    const signalMapValue = ABORT_CONTROLLER_MAP.get(signalMapKey)
    config.signal = controller.signal
    ABORT_CONTROLLER_MAP.set(signalMapKey, {
        url: config.url!,
        abortController: controller
    })
    if (signalMapValue) {
        throw "请求重复"
    }
    return config
}
/**
 * 请求前的拦截器
 */
export const requestInterceptors = {
    loadingInterceptor,
    injectHeaderInterceptor,
    injectAbortControllerInterceptor,
    requestSuccessInterceptor,
    requestFailInterceptor
}

/**
 * 释放 `abortController`
 * @param response
 * @returns
 */
function releaseAbortControllerInterceptor(response: AxiosResponse) {
    const { config } = response
    const signalMapKey = generateSignalKey(config)
    ABORT_CONTROLLER_MAP.get(signalMapKey) && ABORT_CONTROLLER_MAP.delete(signalMapKey)
    return response
}
/**
 * HTTP 请求响应成功
 * @param response
 * @returns
 */
function httpResponseInterceptor(response: AxiosResponseType) {
    return response.status === HTTP_CODE.SUCCESS ? response : Promise.reject(response)
}
/**
 * 业务系统中请求响应成功，在这里对数据进行集中处理
 * @param response
 * @returns
 */
function responseSuccessInterceptor<T extends AxiosResponse<A>, A extends Api.BaseDataStructure>(response: T) {
    const { data, config } = response
    // 不做任何处理，直接返回
    if (config?._customResponse) {
        return response
    }
    if (data.code === HTTP_CODE.SUCCESS) {
        return data
    } else if (data.code === HTTP_CODE.UNAUTHORIZED) {
        // 无权限进入，可以做一些退出登录 或者重定向问题
        return data
    }
    return Promise.reject(data)
}
/**
 * 响应失败
 * @param error
 * @returns
 */
function responseFailInterceptor(error: AxiosError) {
    console.error("响应失败", error)
    const { message, config, response } = error
    // 在这里释放错误请求，不然会被当成重复请求取消掉
    releaseAbortControllerInterceptor(error as unknown as AxiosResponse)
    if (axios.isCancel(error)) {
        // 请求被取消，需要做什么处理
    }
    if (message === "Network Error") {
        // 网络有误
        alert("网络有误，请检查网络是否可用")
        return Promise.reject(error)
    }
    if (message.includes("timeout")) {
        // 接口超时了
        const maxResendTimes = config?._currentRequestMaxResendTimes !== undefined ? config._currentRequestMaxResendTimes : MAX_RESEND_TIMES
        if (config?._currentRequestCount! === maxResendTimes) {
            return Promise.reject(error)
        }
        config!._currentRequestCount!++
        // 重新发起请求
        return Promise.resolve().then(() => instance(config!))
    }
    if (response && response.status === HTTP_CODE.UNAUTHORIZED) {
        // 未授权
    }
    if (response && response.status === HTTP_CODE.SERVICE_ERROR) {
        // 服务器异常
    }
    if (response && response.status === HTTP_CODE.NOT_FOUND) {
        // 接口404
    }
    return Promise.reject(error)
}
/**
 * 响应后的拦截器
 */
export const responseInterceptors = {
    responseSuccessInterceptor,
    responseFailInterceptor,
    releaseAbortControllerInterceptor,
    httpResponseInterceptor
}

export default instance
