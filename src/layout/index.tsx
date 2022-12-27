import React, { FC, useEffect } from "react"
import { Layout as AntdLayout } from "antd"
import Header from "./header"
import Sider from "./sider"
import Content from "./content"
import Footer from "./footer"
import { useRoute } from "@/hooks"

const Layout: FC = () => {
    const { location, navigate } = useRoute()

    useEffect(() => {
        location.pathname === "/" &&
            navigate("/home", {
                replace: true
            })
    }, [location])
    return (
        <AntdLayout className="h100">
            <Sider />
            <AntdLayout>
                <Header />
                <Content />
                <Footer />
            </AntdLayout>
        </AntdLayout>
    )
}

export default Layout
