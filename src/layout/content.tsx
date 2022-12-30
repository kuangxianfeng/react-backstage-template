import React, { FC, Suspense } from "react"
import { Layout, Skeleton } from "antd"
import { Outlet } from "react-router-dom"

const { Content: AntdContent } = Layout

const Content: FC = () => (
    <AntdContent className="overflow-scroll-y">
        <Suspense fallback={<Skeleton />}>
            <Outlet />
        </Suspense>
    </AntdContent>
)

export default Content
