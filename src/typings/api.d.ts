declare namespace Api {
    /**
     * 基础数据结构，如若不一样可以修改、新增
     */
    type BaseDataStructure<T = any> = {
        code: number
        data: T
        msg: string
    }
}
