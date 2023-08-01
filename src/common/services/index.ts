import type { AntdSiderListProps } from "@/common/types"
import { httpInstance } from "@/http"


export const getMenuList = () => httpInstance.get<unknown, API.BaseDataStructure<AntdSiderListProps[]>>("/getMenuList")
