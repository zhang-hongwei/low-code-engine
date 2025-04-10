import { StateCreator } from 'zustand/vanilla';
import { EditorStore } from './store';
import { ComponentNode } from './types';
import { nanoid } from 'nanoid'; // 使用 nanoid 生成唯一 ID



// 编辑器操作接口
export interface EditorAction {

    updateNodeProps: (nodeId: string, newProps: Partial<ComponentNode['props']>) => void
    setComponentTree: (tree: ComponentNode) => void;
    addComponent: (parentId: string, component: ComponentNode) => void;
    moveComponent: (dragId: string, targetId: string) => void;
    createNewComponentNode: (dragged: any) => ComponentNode;
    setActiveId: (id: string | null) => void;
}

// 编辑器状态
export const EditorSlice: StateCreator<
    EditorStore,
    [['zustand/devtools', never]],
    [],
    EditorAction
> = (set, get) => ({
    // 设置选中的组件 ID


    // 更新组件的属性
    updateNodeProps: (nodeId, newProps) => {
        set((state) => {
            const node = state.componentTree.nodeMap[nodeId]
            if (!node) return state

            const updatedNode: ComponentNode = {
                ...node,
                props: {
                    ...node.props,
                    ...newProps,
                    style: {
                        ...node.props.style,
                        ...newProps.style,
                    },
                },
            }

            return {
                componentTree: {
                    ...state.componentTree,
                    nodeMap: {
                        ...state.componentTree.nodeMap,
                        [nodeId]: updatedNode,
                    },
                },
            }
        })
    },

    // 设置组件树
    setComponentTree: (tree) => {

    },

    // 创建新的组件节点
    createNewComponentNode: (dragged: any): ComponentNode => {
        return {
            id: nanoid(), // 使用 nanoid() 生成唯一 ID
            type: dragged.component.type,

            props: {
                id: dragged.component.id,
                name: dragged.component.name,
                text: dragged.component.name,
                additionalProp: dragged.component.additionalProp,
            },
            children: dragged.component.type === 'container' ? [] : undefined,
        };
    },

    // 添加新组件
    addComponent: (parentId, newNode) => {

        // 更新组件树
        set((state) => {
            const parentNode = state.componentTree.nodeMap[parentId];

            if (!parentNode || parentNode.type !== 'container') {
                console.warn(`无法添加子组件：父节点 ${parentId} 不存在或不是容器`);
                return {};
            }

            const newId = newNode.id;
            const updatedParent: ComponentNode = {
                ...parentNode,
                children: [...(parentNode.children || []), newId],
            };

            return {
                componentTree: {
                    ...state.componentTree,
                    nodeMap: {
                        ...state.componentTree.nodeMap,
                        [newId]: {
                            ...newNode,
                            parentId,
                        },
                        [parentId]: updatedParent,
                    },
                },
            };


        });
    },

    // 移动组件（可以根据实际需求来完善此方法）
    moveComponent: (dragId, targetId) => {
        // 逻辑待完善
    },
    setActiveId: (id) => {
        set({ activeId: id });
    }
});
