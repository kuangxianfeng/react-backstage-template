import React, { FC } from "react"
import { Layout } from "antd"
import { Outlet } from "react-router-dom"

const { Content: AntdContent } = Layout

const Content: FC = () => (
    <AntdContent className="overflow-scroll-y">
        <Outlet />
    </AntdContent>
)

export default Content
