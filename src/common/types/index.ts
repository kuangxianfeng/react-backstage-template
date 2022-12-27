import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router-dom'
/** antd 菜单栏类型 */
export type AntdSiderListProps = Required<MenuProps>["items"]

/**
 * React 路由数组
 */
export type RoutesListTypes = RouteObject[]