import React, { CSSProperties, FC } from "react"
import { Layout } from "antd"
import { useRecoilState } from "recoil"
import { siderCollapsedState } from "@/common/recoil-state"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import style from "./common.module.less"

const { Header: AntdHeader } = Layout
const fontSize: CSSProperties = {
    fontSize: 20
}
const Header: FC = () => {
    const [siderCollapsed, setSiderCollapsed] = useRecoilState(siderCollapsedState)
    return (
        <AntdHeader className={`${style.header} hor-flex-start`}>
            <div className={`mouse-hand ${style["collapsed-box"]}`} onClick={() => setSiderCollapsed(old => !old)}>
                {siderCollapsed ? <MenuFoldOutlined style={fontSize} /> : <MenuUnfoldOutlined style={fontSize} />}
            </div>
        </AntdHeader>
    )
}

export default Header
