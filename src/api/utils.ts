import { AxiosRequestConfig } from "axios"
import { ABORT_CONTROLLER_MAP } from "./config"

/**
 * 生成用于取消请求的 signalKey
 * @param config 请求 config 信息
 * @returns
 */
export const generateSignalKey = (config: AxiosRequestConfig): string => {
    const { url, params, data, method } = config
    const DATA = method?.toLocaleUpperCase() === "GET" ? params : data
    const signalKey = `${url}-${typeof DATA === "string" ? DATA : JSON.stringify(DATA)}`
    return signalKey
}
/**
 * - 根据 `url` 来取消某个具体情况
 * - 请注意取消请求的时机，有可能 `ABORT_CONTROLLER_MAP` 存在没有的情况
 * @param url 请求的 url
 */
export const basedOnUrlAbort = (url: string) => {
    for (const [_, value] of ABORT_CONTROLLER_MAP) {
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
    for (const [_, value] of ABORT_CONTROLLER_MAP) {
        value.abortController.abort()
    }
}
