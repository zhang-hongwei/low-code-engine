
// 单个组件节点的接口定义
interface ComponentNode {
    id: string; // 组件唯一 ID
    type: string; // 组件类型，如 'container', 'button', 'input' 等
    parentId?: string; // 父组件 ID，如果是根组件或没有父组件则没有此字段
    props: Record<string, any>; // 组件的属性，包括样式、事件等
    children?: string[]; // 子组件的 ID 列表，仅容器组件有该字段
}

// ComponentTree 类型定义
export interface ComponentTree {
    rootId: string; // 根节点的 ID
    nodeMap: Record<string, ComponentNode>; // 节点映射，存储所有组件的信息
}


export interface EditorState {
    componentTree: ComponentTree;
    activeId: string | null;
}
