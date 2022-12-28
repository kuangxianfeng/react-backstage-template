import { axios } from "@/api"
import { AntdSiderListProps } from "@/common/types"


export const getMenuList = () => axios.get<unknown, Api.BaseDataStructure<AntdSiderListProps[]>>("/getMenuList")
