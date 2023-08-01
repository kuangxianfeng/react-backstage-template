/**
 * @description 请求超时事件，单位：秒
 */
export const TIME_OUT = 30

/**
 * @description HTTP 请求状态码
 */
export enum HTTP_CODE {
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    SERVICE_ERROR = 500,
    NETWORK_ANOMALY = 0,
    /**
     * @description `token` 过期
     */
    TOKEN_EXPIRED = 0,
    /**
     * @description 无权限
     */
    USER_NOT_PERMISSIONS = 0
}

/**
 * @description 可重复请求白名单
 */
export const REPEAT_REQUEST_WHITE_LIST: string[] = []

/**
 * @description 请求超时重发次数，请注意与 `TIME_OUT`的配合，数值太大可能会导致页面 loading 长时间不消失，影响用户体验
 */
export const MAX_RESEND_TIMES = 3

/**
 * @description 存储用于取消请求的 map
 */
export const ABORT_CONTROLLER_MAP: Map<
    string,
    {
        url: string
        abortController: AbortController
    }
> = new Map()
