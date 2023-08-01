declare namespace API {
    type BaseResponse = string | number | boolean | Record<string, unknown> | unknown[]
    /**
     * @description 基础数据结构，如若不一样可以修改、新增
     */
    type BaseDataStructure<T = BaseResponse> = {
        code: number
        data: T
        msg: string
    }
}
