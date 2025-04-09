import type { StateCreator } from 'zustand/vanilla';
import { EditorStore } from './store';
import { ComponentNode } from './types';
export interface EditorAction {


    setSelectedId: (id: string | null) => void
    updateProps: (id: string, props: Record<string, any>) => void
    setComponentTree: (tree: ComponentNode) => void
    addComponent: (parentId: string, component: ComponentNode) => void;
}

export const EditorSlice: StateCreator<
    EditorStore,
    [['zustand/devtools', never]],
    [],
    EditorAction
> = (set, get) => ({
    setSelectedId: (id) => set({ selectedId: id }),

    updateProps: (id, newProps) => {
        const update = (node: ComponentNode): ComponentNode => {
            if (node.id === id) {
                return { ...node, props: { ...node.props, ...newProps } }
            }
            if (node.children) {
                return {
                    ...node,
                    children: node.children.map(update),
                }
            }
            return node
        }

        set((state) => ({
            componentTree: update(state.componentTree),
        }))
    },

    setComponentTree: (tree) => set({ componentTree: tree }),
    addComponent: (parentId, newNode) => {

        console.log('log==>parentId>>', parentId, newNode)

        const insert = (node: ComponentNode): ComponentNode => {
            if (node.id === parentId) {
                return {
                    ...node,
                    children: [...(node.children || []), newNode],
                };
            }
            if (node.children) {
                return {
                    ...node,
                    children: node.children.map(insert),
                };
            }
            return node;
        };


        set((state) => ({ componentTree: insert(state.componentTree) }));
    },
});
