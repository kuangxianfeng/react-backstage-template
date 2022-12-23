import React, { FC, useEffect, useState } from "react"
import { Layout, Menu } from "antd"
import type { MenuProps } from "antd"
import { useRecoilState, useRecoilValue } from "recoil"
import { siderHideState, siderCollapsedState, authorizationListState } from "@/common/recoil-state"
import { AllMenuList } from "@/config/all-authorization-list"
import { useRoute } from "@/hooks"
import { getMenuList } from "@/common/services"
import { flatteningTreeWrap, findChildrenDelete } from "@/utils/diff-authorization"

const { Sider: AntdSider } = Layout
function treeFindPath(tree: MenuProps["items"], func: (data: MenuProps["items"]) => boolean, path = []): string[] {
    if (!tree) return []
    for (const data of tree) {
        path.push(data.key)
        if (func(data)) return path
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path)
            if (findChildren.length > 0) return findChildren
        }
        path.pop()
    }
    return []
}

const Sider: FC = () => {
    const {
        location: { pathname },
        navigate
    } = useRoute()
    const siderHide = useRecoilValue(siderHideState)
    const siderCollapsed = useRecoilValue(siderCollapsedState)
    const [authorizationList, setAuthorizationList] = useRecoilState(authorizationListState)
    const [menuListOpenKeys, setMenuListOpenKeys] = useState<string[]>([]) // 打开 Submenu
    const [menuListSelectedKeys, setMenuListSelectedKeys] = useState<string[]>([]) // 选中 menuitem
    const [siderItems, setSiderItems] = useState<MenuProps["items"]>([])
    useEffect(() => {
        if (authorizationList.length === 0) {
            getMenuList().then(res => {
                setAuthorizationList(res.data)
            })
        } else {
            // 当前用户的菜单栏，一维数组
            const flatteningTree = flatteningTreeWrap(authorizationList)
            setSiderItems(findChildrenDelete(AllMenuList, data => !flatteningTree.find(item => item.path === data.key)))
        }
    }, [authorizationList])
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
                items={siderItems}
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
