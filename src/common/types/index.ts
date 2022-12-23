import { RouteObject } from "react-router-dom"

type MetaTypes = {
    title?:string
    icon?:JSX.Element
}
export type MenuListTypes = {
    title: string
    url: string
    id: string
    parentId?: string
    children: MenuListTypes[]
}
