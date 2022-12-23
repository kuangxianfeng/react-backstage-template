import { lazy } from "react"
import type { MenuProps } from "antd"
import { ThunderboltOutlined, SwitcherOutlined, WifiOutlined } from "@ant-design/icons"
import type { RouteObject } from "react-router-dom"

const Home = lazy(() => import("@/pages/home"))
const SignManage = lazy(() => import("@/pages/sign/sign-manage"))
const TemplateManage = lazy(() => import("@/pages/sign/template-manage"))
const AccountManage = lazy(() => import("@/pages/cost-center/account-manage"))
const UsageManage = lazy(() => import("@/pages/cost-center/usage-manage"))

export const allAuthorizationList: RouteObject[] = [
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/sign",
        children: [
            {
                path: "/sign/sign-manage",
                element: <SignManage />
            },
            {
                path: "/sign/template-manage",
                element: <TemplateManage />
            }
        ]
    },
    {
        path: "/cost-center",
        children: [
            {
                path: "/cost-center/account-manage",
                element: <AccountManage />
            },
            {
                path: "/cost-center/usage-manage",
                element: <UsageManage />
            }
        ]
    }
]

export const AllMenuList: MenuProps["items"] = [
    {
        key: "/home",
        label: "首页",
        icon: <ThunderboltOutlined />
    },
    {
        key: "/sign",
        label: "电子签署",
        icon: <SwitcherOutlined />,
        children: [
            {
                key: "/sign/sign-manage",
                label: "签署管理"
            },
            {
                key: "/sign/template-manage",
                label: "模版管理"
            }
        ]
    },
    {
        key: "/cost-center",
        label: "费用中心",
        icon: <WifiOutlined />,
        children: [
            {
                key: "/cost-center/account-manage",
                label: "账户管理"
            },
            {
                key: "/cost-center/usage-manage",
                label: "使用明细"
            }
        ]
    }
]
