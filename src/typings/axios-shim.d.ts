import { AxiosRequestConfig } from "axios"

declare module "axios" {
    /**
     * 扩展 config
     */
    export interface AxiosRequestConfig {
        /**
         * 是否开启请求前的 loading，默认是 开启
         */
        _loading?: boolean
        /**
         * 是否直接返回 response，不对 response 进行数据结构简化处理
         */
        _customResponse?: boolean
        /**
         * 此次请求是否绕过重复请求的检测，也可在 api/config.ts 中的 WHITE_LIST 中通过 url 来配置
         */
        _bypassRepeat?: boolean
        /**
         * 当前请求的请求次数，此参数用来记录失败重发次数，最大重发次数在 `src/api/config.ts` 中
         */
        _currentRequestCount?: number
        /**
         * 此次请求如果超时，重试的次数，会覆盖掉 `src/api/config.ts` 中 `MAX_RESEND_TIMES`
         */
        _currentRequestMaxResendTimes?: number
    }
}
