// import { useEditorStore, ComponentNode } from '@/stores/editorStore'
import { useEditorStore } from '../store/editor'
import { ComponentNode } from '../store/editor/types'


import clsx from 'clsx'

export const ComponentWrapper = ({ node, children }: {
    node: ComponentNode
    children: React.ReactNode
}) => {
    const { selectedId, setSelectedId } = useEditorStore()

    const isSelected = node.id === selectedId

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setSelectedId(node.id)
            }}
            className={clsx('relative p-1', isSelected && 'outline outline-blue-500')}
        >
            {children}
        </div>
    )
}
