import { RoutesListTypes } from "@/common/types"
import { AllMenuList, AllRouteList } from "@/config/all-authorization-list"

export type TreeDataTypes = {
    children?: TreeDataTypes[]
    key?: string
    path?: string
}
/**
 * @description 将树结构拍平
 * @param treeWrap 
 * @returns 
 */
export function flatteningTree<T extends TreeDataTypes[]>(treeWrap: T) {
    const array = [] as unknown as T
    const flatteningTreeOuter = (tree: T) => {
        tree.forEach(item => {
            array.push(item)
            item.children && item.children.length > 0 && flatteningTreeOuter(item.children as unknown as T)
        })
    }
    flatteningTreeOuter(treeWrap)
    return array
}
/**
 * @description 在树结构中删除指定条件的数据
 * @param treeData 
 * @param fn 
 * @returns 
 */
export function findChildrenDelete<T extends TreeDataTypes[]>(treeData: T, fn: (item: TreeDataTypes) => boolean) {
    treeData.forEach((item, index) => {
        fn(item) && treeData.splice(index, 1)
        item.children && findChildrenDelete(item.children, fn)
    })
    return treeData
}
/**
 * @description 在树结构中找出符合条件的所有层级，以 key 值作为数组
 * @param treeData 
 * @param func 
 * @param path 
 * @returns 
 */
export function treeFindPath<T extends K[], K extends TreeDataTypes>(treeData: T, func: (item: K) => boolean, path: string[] = []): string[] {
    if (!treeData) return []
    // eslint-disable-next-line no-restricted-syntax
    for (const data of treeData) {
        path.push(data.key)
        if (func(data)) return path
        if ((data as any).children) {
            const findChildren = treeFindPath((data as any).children, func, path)
            if (findChildren.length > 0) return findChildren
        }
        path.pop()
    }
    return []
}
/**
 * @description 过滤权限菜单
 * @param treeData 
 * @returns 
 */
export function filterAuthorizationSiderList<T extends TreeDataTypes[]>(treeData: T) {
    const flatteningTreeData = flatteningTree(treeData)
    return findChildrenDelete(AllMenuList as any, data => !flatteningTreeData.some(item => item.path === data.key))
}
/**
 * @description 过滤权限路由
 * @param treeData 
 * @returns 
 */
export const filterAuthorizationRoutesList = (treeData: RoutesListTypes) => {
    const flatteningTreeData = flatteningTree(treeData)
    return findChildrenDelete(AllRouteList, data => !flatteningTreeData.some(item => item.path === data.path))
}

