import React, { FC } from "react"
import { Layout } from "antd"
import { useRecoilValue } from "recoil"
import { footerHideState } from "@/common/recoil-state"

const { Footer: AntdFooter } = Layout

const Footer: FC = () => {
    const footerHide = useRecoilValue(footerHideState)
    return footerHide ? <AntdFooter>Footer</AntdFooter> : <></>
}

export default Footer
