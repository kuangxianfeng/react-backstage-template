import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
// 下面这行是解决 RangePicker 的汉化
import "dayjs/locale/zh-cn"
import "./plugins"

// <React.StrictMode></React.StrictMode> 在开发模式下会导致走两次 useEffect 暂时先删掉
ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(<App />)
