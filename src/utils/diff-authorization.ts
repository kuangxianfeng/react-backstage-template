export function flatteningTreeWrap<T extends unknown[]>(treeWrap: T) {
    const array: T = []
    const flatteningTree = (tree: T) => {
        tree?.forEach(item => {
            if (item) {
                array.push(item)
                item.children && item.children?.length > 0 && flatteningTree(item.children)
            }
        })
    }
    flatteningTree(treeWrap)
    return array
}

export const findChildrenDelete = (treeData, fn) => {
    treeData.map((item, index) => {
        fn(item) && treeData.splice(index, 1)
        item.children && findChildrenDelete(item.children, fn)
    })
    return treeData
}
