import React, { FC } from "react"
import { ConfigProvider } from "antd"
import { HashRouter } from 'react-router-dom'
import { RecoilRoot } from "recoil"
import zhCN from "antd/es/locale/zh_CN"
import Routes from "./routes"
import { THEME_COLOR } from "./config"

const App: FC = () => (
    <ConfigProvider
        locale={zhCN}
        theme={{
            token: {
                colorPrimary: THEME_COLOR
            }
        }}
    >
        <RecoilRoot>
            <HashRouter>
                <Routes />
            </HashRouter>
        </RecoilRoot>
    </ConfigProvider>
)

export default App
