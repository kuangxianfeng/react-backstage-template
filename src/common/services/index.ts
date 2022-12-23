import axios from "@/api"
import { MenuListTypes } from "@/common/types"


export const getMenuList = () => axios.get<unknown, Api.BaseDataStructure<MenuListTypes[]>>("/getMenuList")
