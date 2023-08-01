import { AntdSiderListProps } from "@/common/types"
import { httpInstance } from "@/http"

export type LoginResponse = {
    token: string
    username: string
    tel: string
    menuList: AntdSiderListProps[]
}
export const loginRequest = () => httpInstance.get<unknown, API.BaseDataStructure<LoginResponse>>("/login")
