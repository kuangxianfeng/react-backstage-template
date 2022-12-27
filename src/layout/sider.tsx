import React, { FC, useEffect, useState } from "react"
import { Layout, Menu } from "antd"
import type { MenuProps } from "antd"
import { useRecoilValue } from "recoil"
import { siderHideState, siderCollapsedState, authorizationSiderListState } from "@/common/recoil-state"
import { AllMenuList } from "@/config/all-authorization-list"
import { useRoute } from "@/hooks"
import { treeFindPath } from "@/utils/diff-authorization"

const { Sider: AntdSider } = Layout
const Sider: FC = () => {
    const {
        location: { pathname },
        navigate
    } = useRoute()
    const siderHide = useRecoilValue(siderHideState)
    const siderCollapsed = useRecoilValue(siderCollapsedState)
    const authorizationSiderList = useRecoilValue(authorizationSiderListState)
    const [menuListOpenKeys, setMenuListOpenKeys] = useState<string[]>([]) // 打开 Submenu
    const [menuListSelectedKeys, setMenuListSelectedKeys] = useState<string[]>([]) // 选中 menuitem
    useEffect(() => {
        const arr = treeFindPath(AllMenuList, data => data.key === pathname)
        setMenuListSelectedKeys(arr)
        setMenuListOpenKeys([arr[0]])
    }, [pathname])
    const menuListOnOpenChange: MenuProps["onOpenChange"] = openKeys => {
        setMenuListOpenKeys(openKeys)
    }
    // 点击 Menu.Item 的回调
    const menuListOnClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key)
    }
    return siderHide ? (
        <AntdSider theme="light" collapsed={siderCollapsed}>
            <Menu
                mode="inline"
                items={authorizationSiderList}
                theme="dark"
                className="h100"
                onOpenChange={menuListOnOpenChange}
                openKeys={menuListOpenKeys}
                selectedKeys={menuListSelectedKeys}
                onClick={menuListOnClick}
            />
        </AntdSider>
    ) : (
        <></>
    )
}

export default Sider
