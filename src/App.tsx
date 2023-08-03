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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore ts类型不兼容，代码运行没任何问题
                colorPrimary: THEME_COLOR,
            },
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
