import { ComponentNode } from '@/store/editor/types'

export const findParent = (
    node: ComponentNode,
    childId: string
): ComponentNode | null => {
    if (!node.children) return null

    for (const child of node.children) {
        if (child.id === childId) return node
        const found = findParent(child, childId)
        if (found) return found
    }

    return null
}



export const replaceNode = (
    node: ComponentNode,
    newNode: ComponentNode
): ComponentNode => {
    if (node.id === newNode.id) {
        return newNode
    }

    if (node.children) {
        return {
            ...node,
            children: node.children.map((child) => replaceNode(child, newNode)),
        }
    }

    return node
}
