import { atom } from "recoil"
import { RECOIL_KEYS } from "@/recoil-keys"
import { MenuListTypes } from "@/common/types"
const { SIDER_HIDE_KEY, SIDER_COLLAPSED_KEY, FOOTER_HIDE_KEY, AUTHORIZATION_LIST_KEY } = RECOIL_KEYS

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

export const authorizationListState = atom<MenuListTypes[]>({
    key: AUTHORIZATION_LIST_KEY,
    default: []
})
