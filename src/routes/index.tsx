import React, { lazy, useEffect } from "react"
import Layout from "@/layout"
import sessionAccessor from "@/utils/session-accessor"
import type { RouteObject } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useRoutes } from "react-router-dom"
import { useRecoilState } from "recoil"
import { authorizationSiderListState, authorizationRoutesListState } from "@/common/recoil-state"
import { getMenuList } from "@/common/services"
import { filterAuthorizationSiderList, filterAuthorizationRoutesList } from "@/utils/diff-authorization"

const NotFound = lazy(() => import("../pages/not-found"))
const Login = lazy(() => import("../pages/login"))

const Routes = () => {
    const token = sessionAccessor.get("token")
    const [authorizationSiderList, setAuthorizationSiderList] = useRecoilState(authorizationSiderListState)
    const [authorizationRoutesList, setAuthorizationRoutesList] = useRecoilState(authorizationRoutesListState)
    useEffect(() => {
        if (authorizationSiderList.length === 0 && !!token) {
            getMenuList().then(res => {
                setAuthorizationSiderList(filterAuthorizationSiderList(res.data))
                setAuthorizationRoutesList(filterAuthorizationRoutesList(res.data))
            })
        }
    }, [authorizationSiderList])
    const routes: RouteObject[] = [
        {
            path: "/",
            element: token ? <Layout /> : <Navigate to="/login" />,
            children: authorizationRoutesList
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/not-found",
            element: <NotFound />
        }
        // {
        //     path: "*",
        //     element: <Navigate replace to="not-found" />
        // }
    ]
    return useRoutes(routes)
}

export default Routes
