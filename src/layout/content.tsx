import React, { CSSProperties, FC } from "react"
import { Layout } from "antd"
import { Outlet } from "react-router-dom"

const { Content: AntdContent } = Layout
const c: CSSProperties = {
    overflowY: "scroll"
}
const Content: FC = () => (
    <AntdContent style={c}>
        <Outlet />
    </AntdContent>
)

export default Content
