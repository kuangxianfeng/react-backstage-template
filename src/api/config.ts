/**
 * 配置文件
 */

export const BASE_URL = "http://localhost:3000"
// export const BASE_URL = "https://qbqdev.isigning.cn"

export const TIME_OUT = 30 * 1000

/**
 * HTTP 请求状态码
 */
export enum HTTP_CODE {
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    SERVICE_ERROR = 500
}

/**
 * 不检测重复请求白名单，也可以通过头部自定义参数来指定某次请求，见 typings/axios-shim.d.ts
 * 请求地址 url
 */
export const WHITE_LIST: string[] = []

/**
 * 存储用于取消请求的 map
 */
export const ABORT_CONTROLLER_MAP: Map<
    string,
    {
        url: string
        abortController: AbortController
    }
> = new Map()

/**
 * 当前请求次数
 */
export const CURRENT_REQUEST_COUNT = 0

/**
 * 最大请求次数，约束与超时请求
 */
export const MAX_RESEND_TIMES = 3
