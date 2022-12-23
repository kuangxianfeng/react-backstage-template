import React, { FC } from "react"
import { Layout as AntdLayout } from "antd"
import Header from "./header"
import Sider from "./sider"
import Content from "./content"
import Footer from "./footer"

const Layout: FC = () => (
    <AntdLayout className="h100">
        <Sider />
        <AntdLayout>
            <Header />
            <Content />
            <Footer />
        </AntdLayout>
    </AntdLayout>
)

export default Layout
