import React, { lazy, useEffect, useMemo } from "react"
import type { RouteObject } from "react-router-dom"
import { Navigate, useRoutes } from "react-router-dom"
import { useRecoilState } from "recoil"
import Layout from "@/layout"
import sessionAccessor from "@/utils/session-accessor"
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorizationSiderList])
    const routes = useMemo<RouteObject[]>(() => {
        const defaultRoutes = [
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
        ]
        if (!token || authorizationSiderList.length === 0) {
            return defaultRoutes
        }
        return [
            ...defaultRoutes,
            {
                path: "*",
                element: <Navigate replace to="not-found" />
            }
        ]
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorizationRoutesList])
    return useRoutes(routes)
}

export default Routes
