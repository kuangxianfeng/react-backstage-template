import { FC, Suspense } from "react"
import { HashRouter } from "react-router-dom"
import { ConfigProvider } from "antd"
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
            <Suspense fallback={<p>loading...</p>}>
                <HashRouter>
                    <Routes />
                </HashRouter>
            </Suspense>
        </RecoilRoot>
    </ConfigProvider>
)

export default App
