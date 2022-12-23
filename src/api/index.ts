import instance, { requestInterceptors, responseInterceptors } from "./interceptors"
const { requestSuccessInterceptor, requestFailInterceptor, loadingInterceptor, injectHeaderInterceptor, injectAbortControllerInterceptor } =
    requestInterceptors
const { responseSuccessInterceptor, responseFailInterceptor, releaseAbortControllerInterceptor, httpResponseInterceptor } = responseInterceptors

instance.interceptors.request.use(loadingInterceptor)
instance.interceptors.request.use(injectHeaderInterceptor)
instance.interceptors.request.use(injectAbortControllerInterceptor)
instance.interceptors.request.use(requestSuccessInterceptor, requestFailInterceptor)

instance.interceptors.response.use(releaseAbortControllerInterceptor)
instance.interceptors.response.use(httpResponseInterceptor)
instance.interceptors.response.use(responseSuccessInterceptor, responseFailInterceptor)
export default instance
