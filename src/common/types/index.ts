import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router-dom'

/**
 * @description `antd` 菜单栏类型
 */
export type AntdSiderListProps = Exclude<Required<MenuProps>["items"][number], null>[]
/**
 * @description `React` 路由数组
 */
export type RoutesListTypes = RouteObject[]