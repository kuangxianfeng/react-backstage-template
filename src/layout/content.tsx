import React, { FC, Suspense, useState } from "react"
import { Layout } from "antd"
import { Outlet, } from "react-router-dom"
import Fallback from './fallback'

const { Content: AntdContent } = Layout

const Content: FC = () => {
    const [showLazyComponent, setShowLazyComponent] = useState(false)
    return (
        <AntdContent className="overflow-scroll-y">
            <Suspense fallback={<Fallback />}>
                <Outlet />
            </Suspense>
        </AntdContent>
    )
}

export default Content
