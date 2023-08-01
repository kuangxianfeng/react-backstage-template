import axios from 'axios'
import { API_URL } from '@/config'
import { TIME_OUT } from './config'
import { requestInterceptors, responseInterceptors } from './interceptors'

const { loadingInterceptor, injectHeaderInterceptor, injectAbortControllerInterceptor } = requestInterceptors

const {
    releaseLoadingInterceptor,
    releaseAbortControllerInterceptor,
    httpSuccessResponseInterceptor,
    responseSuccessInterceptor,
    httpFailInterceptor,
    responseFailInterceptor
} = responseInterceptors

const instance = axios.create({
    baseURL: API_URL,
    timeout: TIME_OUT * 1000,
    _currentRequestCount: 0
})

instance.interceptors.request.use(loadingInterceptor)
instance.interceptors.request.use(injectHeaderInterceptor)
instance.interceptors.request.use(injectAbortControllerInterceptor)

instance.interceptors.response.use(releaseAbortControllerInterceptor, error => responseFailInterceptor(error))
instance.interceptors.response.use(releaseLoadingInterceptor)
instance.interceptors.response.use(httpSuccessResponseInterceptor)
instance.interceptors.response.use(responseSuccessInterceptor, error => httpFailInterceptor(error, instance))

export { instance as httpInstance }
