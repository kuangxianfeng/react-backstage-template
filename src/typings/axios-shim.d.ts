import type { AxiosRequestConfig } from 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        /**
         * @description 是否开启 loading
         */
        _loading?: boolean
        /**
         * @description 加载文案，默认是：加载中···
         */
        _loadingText?: string
        /**
         * 此次请求是否绕过重复请求的检测，也可在 api/config.ts 中的 WHITE_LIST 中通过 url 来配置
         */
        _bypassRepeatDetection?: boolean
        /**
         * @description 自定义处理响应信息，在 `.then` 接收
         */
        _customResponse?: boolean
        /**
         * @description 只接管 code≠200，在 `.catch` 接收
         */
        _lowCustomResponse?: boolean
        /**
         * @description 只接管指定 code 码，在 `.catch` 接收
         */
        _targetedCustomResponse?: number[]
        /**
         * @description 当前请求次数，用于超时重发，默认是0，有最大值：`/src/api/config.ts` 中的 `MAX_RESEND_TIMES`
         */
        _currentRequestCount?: number
        /**
         * @description 当前请求的最大重发次数，权重大于 `MAX_RESEND_TIMES`
         */
        _currentRequestMaxResendTimes?: number
        /**
         * @description 请求头中该请求的唯一 `key` 值
         */
        _requestKey?: string
        /**
         * 错误信息提示配置
         */
        _messageOptions?: { message?: string; [x: string]: string | number | boolean }
    }
}
