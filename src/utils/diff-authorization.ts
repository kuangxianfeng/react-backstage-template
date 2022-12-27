import {  RoutesListTypes } from "@/common/types"
import { AllMenuList, AllRouteList } from "@/config/all-authorization-list"

export type TreeDataTypes = {
    children?: TreeDataTypes[]
    key?: string
    path?: string
}

export function flatteningTreeWrap<T extends TreeDataTypes[]>(treeWrap: T) {
    const array = [] as unknown as T
    const flatteningTree = (tree: T) => {
        tree.forEach(item => {
            array.push(item)
            item.children && item.children.length > 0 && flatteningTree(item.children as unknown as T)
        })
    }
    flatteningTree(treeWrap)
    return array
}

export function findChildrenDelete<T extends TreeDataTypes[]>(treeData: T, fn: (item: TreeDataTypes) => boolean) {
    treeData.map((item, index) => {
        fn(item) && treeData.splice(index, 1)
        item.children && findChildrenDelete(item.children, fn)
    })
    return treeData
}
export function treeFindPath<T extends TreeDataTypes[], K = TreeDataTypes>(treeData: T, func: (item: K) => boolean): string[] {
    if (!treeData) return []
    const arr: string[] = []
    const treeFindPathOuter = (tree: T) => {
        for (const data of tree) {
            arr.push(data.key!)
            if (func(data as unknown as K)) return arr
            if (data.children) {
                const findChildren = treeFindPath(data.children, func)
                if (findChildren.length > 0) return findChildren
            }
            arr.pop()
        }
    }
    treeFindPathOuter(treeData)
    return []
}
export function filterAuthorizationSiderList<T extends TreeDataTypes[]>(treeData: T) {
    const flatteningTree = flatteningTreeWrap(treeData)
    return findChildrenDelete(AllMenuList as any, data => !flatteningTree.find(item => item.path === data.key))
}
export const filterAuthorizationRoutesList = (treeData: RoutesListTypes) => {
    const flatteningTree = flatteningTreeWrap(treeData)
    return findChildrenDelete(AllRouteList, data => !flatteningTree.find(item => item.path === data.path))
}

