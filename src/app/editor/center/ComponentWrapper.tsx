import { useEditorStore } from '../../../store/editor'
import { ComponentNode } from '../../../store/editor/types'
import { useDraggable } from '@dnd-kit/core'
import clsx from 'clsx'

export const ComponentWrapper = ({ node, children }: {
    node: ComponentNode
    children: React.ReactNode
}) => {
    const { selectedId, setSelectedId } = useEditorStore()
    const isSelected = node.id === selectedId

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: node.id,
        data: {
            id: node.id,
            type: 'existing-component', // 用于区分已有组件 vs 新组件
            node, // 可以传 node 结构用于拖拽时携带节点
        },
    })

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
                opacity: isDragging ? 0.5 : 1,
            }}
            onClick={(e) => {
                e.stopPropagation()
                setSelectedId(node.id)
            }}
            className={clsx('relative p-1', isSelected && 'outline outline-blue-500')}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    )
}
