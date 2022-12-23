import React, { FC } from "react"
import { Button } from "antd"
import { loginRequest } from "./services"
import sessionAccessor from "@/utils/session-accessor"
import { useRoute } from "@/hooks"
import { useSetRecoilState } from "recoil"
import { authorizationListState } from "@/common/recoil-state"

const Login: FC = () => {
    const setAuthorizationList = useSetRecoilState(authorizationListState)
    const { navigate } = useRoute()
    const login = () => {
        loginRequest().then(res => {
            const { token, menuList } = res.data
            sessionAccessor.set("token", token)
            setAuthorizationList(menuList)
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
