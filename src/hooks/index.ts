import { useMemo, useEffect } from "react"
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import { FormInstance, Form } from "antd"

/**
 * @description 获取路由相关的信息
 * @returns  params 传递的参数
 * ```
 * 比如：路由为/certificate-report/:fileId =》 /certificate-report/123
 * const { params }=useRoute()
 * console.log(params) // {fileId: '1'}
 * ```
 * @returns navigate 跳转路由
 */
export function useRoute<T extends string | Record<string, string | undefined> = string>() {
    const navigate = useNavigate()
    const params = useParams<T>()
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const routeAPI = useMemo(
        () => ({
            navigate,
            params,
            searchParams,
            setSearchParams,
            location
        }),
        [location, navigate, params, searchParams, setSearchParams]
    )
    return routeAPI
}

export type UseBaseFormHandleReturnTypes<T> = {
    resetHandle: () => void
    submit: () => void
    form: FormInstance<T>
    paginationOnChange: () => void
}
export type UseBaseFormHandleOptionsTypes = {
    auto: boolean
}
/**
 * @description 包含 Form 组件的基本操作
 * @param options  auto 是否在useEffect发起submit事件
 * @returns
 */
export function useBaseFormHandle<T = any>(options?: UseBaseFormHandleOptionsTypes): UseBaseFormHandleReturnTypes<T> {
    const [form] = Form.useForm<T>()
    useEffect(() => {
        options?.auto && form.submit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handle = useMemo<Omit<UseBaseFormHandleReturnTypes<T>, "form">>(() => {
        const resetHandle = () => {
            form.resetFields()
            form.submit()
        }
        const submit = () => {
            form.submit()
        }
        const paginationOnChange = () => {
            form.submit()
        }
        return {
            resetHandle,
            submit,
            paginationOnChange
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { ...handle, form }
}
