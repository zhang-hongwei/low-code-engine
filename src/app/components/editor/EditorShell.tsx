'use client'
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'



import { useState } from 'react'
import { useEditorStore } from '@/app/store/editor'
import { ComponentNode } from '@/app/store/editor/types'

export const EditorShell = ({ children }: any) => {
    const sensors = useSensors(useSensor(PointerSensor))
    const [draggingComponent, setDraggingComponent] = useState<any>(null)
    const { addComponent, moveComponent } = useEditorStore()





    const handleDragStart = (event: any) => {
        if (event.active.data.current?.type === 'new-component') {
            setDraggingComponent(event.active.data.current.component)
        }
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!active || !over || active.id === over.id) return


        const dragged = active.data.current
        const dropTargetId = over?.id

        console.log('log===fll===>>>1', event,)
        console.log('log===fll===>>>2', over,)
        console.log('log===fll===>>>3', dragged)

        if (!dropTargetId) return

        // ✅ 添加新组件
        if (dragged?.type === 'new-component') {
            const newNode: ComponentNode = {
                id: `node_${Date.now()}`,
                type: dragged.component.type,
                props: {
                    id: dragged.component.id,
                    name: dragged.component.name,
                    type: dragged.component.type,
                },
                children: dragged.component.type === 'container' ? [] : undefined,
            }

            addComponent(dropTargetId === 'canvas' ? 'root' : dropTargetId, newNode)
        }

        // ✅ 移动已有组件
        if (dragged?.type === 'existing-component') {
            // 移动的是组件树内的节点
            moveComponent(dragged.id, dropTargetId)
        }

        setDraggingComponent(null)
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {
                children
            }

            <DragOverlay>
                {draggingComponent ? (
                    <div className="p-2 bg-blue-300 rounded shadow">
                        {draggingComponent.name}
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}


