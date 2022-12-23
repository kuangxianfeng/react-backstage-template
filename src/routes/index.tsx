import React, { lazy } from "react"
import Layout from "@/layout"
import sessionAccessor from "@/utils/session-accessor"
import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useRoutes } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { authorizationListState } from "@/common/recoil-state"

const NotFound = lazy(() => import("../pages/not-found"))
const Login = lazy(() => import("../pages/login"))

const Routes = () => {
    const token = sessionAccessor.get("token")
    const authorizationList = useRecoilValue(authorizationListState)
    const routes: RouteObject[] = [
        {
            path: "/",
            element: token ? <Layout /> : <Navigate to="/login" />,
            children: authorizationList
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/not-found",
            element: <NotFound />
        },
        {
            path: "*",
            element: <Navigate replace to="not-found" />
        }
    ]
    return useRoutes(routes)
}

export default Routes
