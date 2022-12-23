import api from "@/api"
import { MenuListTypes } from "@/common/types"

export type LoginResponse = {
    token: string
    username: string
    tel: string
    menuList: MenuListTypes[]
}
export const loginRequest = () => api.get<unknown, Api.BaseDataStructure<LoginResponse>>("/login")
