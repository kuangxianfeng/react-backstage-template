import { AntdSiderListProps, RoutesListTypes } from "@/common/types"
import { AllMenuList, AllRouteList } from "@/config/all-authorization-list"

export type A = {
    children?: A[]
}

export function flatteningTreeWrap<T>(treeWrap: T) {
    const array: T = []
    const flatteningTree = (tree: T) => {
        tree.forEach(item => {
            array.push(item)
            item.children && item.children.length > 0 && flatteningTree(item.children)
        })
    }
    flatteningTree(treeWrap)
    return array
}

export function findChildrenDelete(treeData, fn) {
    treeData.map((item, index) => {
        fn(item) && treeData.splice(index, 1)
        item.children && findChildrenDelete(item.children, fn)
    })
    return treeData
}
export function treeFindPath(tree, func, path = []) {
    if (!tree) return []
    for (const data of tree) {
        path.push(data.key)
        if (func(data)) return path
        if (data.children) {
            const findChildren = treeFindPath(data.children, func, path)
            if (findChildren.length > 0) return findChildren
        }
        path.pop()
    }
    return []
}
export function filterAuthorizationSiderList(treeData: AntdSiderListProps) {
    const flatteningTree = flatteningTreeWrap(treeData)
    return findChildrenDelete(AllMenuList, data => !flatteningTree.find(item => item.path === data.key))
}
export const filterAuthorizationRoutesList = (treeData: RoutesListTypes) => {
    const flatteningTree = flatteningTreeWrap(treeData)
    return findChildrenDelete(AllRouteList, data => !flatteningTree.find(item => item.path === data.path))
}
