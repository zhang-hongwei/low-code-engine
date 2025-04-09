

export interface ComponentNode {
    id: string
    type: string
    props: Record<string, any>
    children?: ComponentNode[]
}


export interface EditorState {
    componentTree: ComponentNode
    selectedId: string | null
}
