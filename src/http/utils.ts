/* eslint-disable no-restricted-syntax */
import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import { message as AntdMessage } from 'antd'
import { randomString } from '@/utils'
import { ABORT_CONTROLLER_MAP } from './config'

/**
 * @description 基于请求数据生成此次请求的统一字符串标识
 * @description 但是对于 `FormData` 没有办法处理，只能生成随机字符串
 * @param data 请求数据
 */
export const handlerRequestData = (data: any) => {
    if (typeof data === 'string') {
        return data
    }
    if (data instanceof FormData) {
        return randomString(16)
    }
    return JSON.stringify(data)
}

/**
 * @description 生成用于取消请求的 signalKey
 * @param config 请求 config 信息
 * @returns {String}
 */
export const generateSignalKey = (config: AxiosRequestConfig): string => {
    const { params, data, method, url } = config
    const DATA = method?.toLocaleUpperCase() === 'GET' ? params : data
    const signalKey = `${url}-${handlerRequestData(DATA)}`
    return signalKey
}
/**
 * - 根据 `url` 来取消某个具体情况
 * - 请注意取消请求的时机，有可能 `ABORT_CONTROLLER_MAP` 存在没有的情况
 * @param url 请求的 url
 */
export const basedOnUrlAbort = (url: string) => {
    for (const [, value] of ABORT_CONTROLLER_MAP) {
        value.url === url && value.abortController.abort()
    }
}

/**
 * - 根据 `ABORT_CONTROLLER_MAP` 的 `key` 值来取消某个请求
 * - 请注意取消请求的时机，有可能 `ABORT_CONTROLLER_MAP` 存在没有的情况
 * @param key `ABORT_CONTROLLER_MAP` 的 `key`
 */
export const basedOnAbortControllerKeyAbort = (key: string) => {
    for (const [_key, value] of ABORT_CONTROLLER_MAP) {
        _key === key && value.abortController.abort()
    }
}

/**
 * - 取消全部未完成的请求
 * - 请注意取消请求的时机，有可能 `ABORT_CONTROLLER_MAP` 存在没有的情况
 */
export const abortAllRequest = () => {
    for (const [, value] of ABORT_CONTROLLER_MAP) {
        value.abortController.abort()
    }
}

/**
 * @description 失败 toast 统一回调
 * @param instance
 * @param message
 */
export function failToastHandler(message: string) {
    AntdMessage.error(message)
}

/**
 * @description 重发请求，在这里需要释放，不然会被重复请求
 * @param instance axiosInstance 实例
 * @param config
 * @returns
 */
export function resendRequest(instance: AxiosInstance, config: AxiosError['config']) {
    config!._currentRequestCount! += 1
    return Promise.resolve().then(() => instance(config!))
}

/**
 * @description 重定向用户去的页面，内部处理 `hash` 路由
 * @param {1|2} type 1=登录页 2=401页面
 */
export function redirectUrl(type: 1 | 2) {
    const { hash, origin } = window.location
    const isHashRouter = hash.includes("#")
    const domain = isHashRouter ? `${origin}/#` : origin
    if (type === 1) {
        window.location.replace(`${domain}/login`)
    } else {
        window.location.replace(`${domain}/401`)
    }
}


