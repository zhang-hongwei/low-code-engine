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

export const EditorShell = ({ children }: any) => {
    const sensors = useSensors(useSensor(PointerSensor))
    const [draggingComponent, setDraggingComponent] = useState<any>(null)
    const { addComponent } = useEditorStore()

    const handleDragStart = (event: any) => {
        if (event.active.data.current?.type === 'new-component') {
            setDraggingComponent(event.active.data.current.component)
        }
    }

    const handleDragEnd = (event: any) => {

        // const isDropOnCanvas = event.over?.id === 'canvas'
        const dropTargetId = event.over?.id; // 目标区域的 ID
        const dragged = event.active.data.current



        if (dropTargetId && dragged?.type === 'new-component') {
            const newNode = {
                id: `node_${Date.now()}`,
                type: dragged.component.type,
                // props: dragged.component.defaultProps || {},
                children: dragged.component.type === 'container' ? [] : undefined,
                props: {
                    id: dragged.component.id,
                    name: dragged.component.name,
                    type: dragged.component.type,
                },
            }
            addComponent(dropTargetId === 'canvas' ? 'root' : dropTargetId, newNode)
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
