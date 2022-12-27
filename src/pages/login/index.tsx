import React, { FC } from "react"
import { Button } from "antd"
import { loginRequest } from "./services"
import sessionAccessor from "@/utils/session-accessor"
import { useRoute } from "@/hooks"
import { useSetRecoilState } from "recoil"
import { authorizationSiderListState } from "@/common/recoil-state"

const Login: FC = () => {
    const setAuthorizationSiderList = useSetRecoilState(authorizationSiderListState)
    const { navigate } = useRoute()
    const login = () => {
        loginRequest().then(res => {
            const { token, menuList } = res.data
            sessionAccessor.set("token", token)
            setAuthorizationSiderList(menuList)
            navigate("/")
        })
    }
    return (
        <div>
            <Button onClick={login}>登录</Button>
        </div>
    )
}

export default Login
