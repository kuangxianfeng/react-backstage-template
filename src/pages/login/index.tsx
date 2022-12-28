import React, { FC } from "react"
import { Button } from "antd"
import sessionAccessor from "@/utils/session-accessor"
import { useRoute } from "@/hooks"
import { useSetRecoilState } from "recoil"
import { authorizationRoutesListState, authorizationSiderListState } from "@/common/recoil-state"
import { filterAuthorizationRoutesList, filterAuthorizationSiderList } from "@/utils/diff-authorization"
import { loginRequest } from "./services"

const Login: FC = () => {
    const setAuthorizationSiderList = useSetRecoilState(authorizationSiderListState)
    const setAuthorizationRoutesList = useSetRecoilState(authorizationRoutesListState)
    const { navigate } = useRoute()
    const login = () => {
        loginRequest().then(res => {
            const { token, menuList } = res.data
            sessionAccessor.set("token", token)
            setAuthorizationSiderList(filterAuthorizationSiderList(menuList))
            setAuthorizationRoutesList(filterAuthorizationRoutesList(menuList))
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
