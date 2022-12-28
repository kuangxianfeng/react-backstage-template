import { axios } from "@/api"
import { AntdSiderListProps } from "@/common/types"

export type LoginResponse = {
    token: string
    username: string
    tel: string
    menuList: AntdSiderListProps[]
}
export const loginRequest = () => axios.get<unknown, Api.BaseDataStructure<LoginResponse>>("/login")
