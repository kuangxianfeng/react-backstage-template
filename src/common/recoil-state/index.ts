import { atom } from "recoil"
import type { MenuProps } from 'antd'
import { RECOIL_KEYS } from "@/recoil-keys"
import { RouteObject } from 'react-router-dom'
import { AntdSiderListProps, RoutesListTypes } from "../types"
const { SIDER_HIDE_KEY, SIDER_COLLAPSED_KEY, FOOTER_HIDE_KEY, AUTHORIZATION_SIDER_LIST_KEY, AUTHORIZATION_ROUTES_LIST_KEY } = RECOIL_KEYS

export const siderHideState = atom({
    key: SIDER_HIDE_KEY,
    default: true
})

export const siderCollapsedState = atom({
    key: SIDER_COLLAPSED_KEY,
    default: false
})

export const footerHideState = atom({
    key: FOOTER_HIDE_KEY,
    default: true
})

export const authorizationSiderListState = atom<AntdSiderListProps>({
    key: AUTHORIZATION_SIDER_LIST_KEY,
    default: []
})

export const authorizationRoutesListState = atom<RoutesListTypes>({
    key: AUTHORIZATION_ROUTES_LIST_KEY,
    default: []
})