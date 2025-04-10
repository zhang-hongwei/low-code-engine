'use client'
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    closestCorners
} from '@dnd-kit/core'

import { useState } from 'react'
import { useEditorStore } from '@/store/editor'
import { ComponentNode } from '@/store/editor/types'

export const DNDProvider = ({ children }: any) => {
    const sensors = useSensors(useSensor(PointerSensor))
    const [draggingComponent, setDraggingComponent] = useState<any>(null)

    const createNewComponentNode = useEditorStore(state => state.createNewComponentNode)
    const addComponent = useEditorStore(state => state.addComponent)
    const moveComponent = useEditorStore(state => state.moveComponent)
    const setActiveId = useEditorStore(state => state.setActiveId)

    const [activeTaskId, setActiveTaskId] = useState<null | string>(null);


    const handleDragStart = ({ active }: DragStartEvent) => {
        // setActiveTaskId(active.id as string);
        setActiveTaskId(active.id as string);
        setActiveId(active.id as string);
        console.log('log===active===>>>1', active)
        if (active.data.current?.type === 'new-component') {
            setDraggingComponent(active.data.current.component)
        }
    };

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        console.log('log=-active===>>>1', active)
        console.log('log=-over===>>>2', over)

        const activeId = active.id as string;
        const overId = over?.id as string;

        if (activeId === overId) return


        moveComponent(activeId, overId)
    };



    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!active || !over || active.id === over.id) return


        const dragged = active.data.current
        const dropTargetId = over?.id

        console.log('log===fll===>>>1', event,)
        console.log('log===fll=active==>>>2', active,)
        console.log('log===fll==over=>>>3', over)
        console.log('log===fll==dragged=>>>3', dragged)

        if (!dropTargetId) return

        // ✅ 添加新组件
        if (dragged?.type === 'new-component') {
            const newNode: ComponentNode = createNewComponentNode(dragged)




            addComponent(dropTargetId === 'canvas' ? 'root' : dropTargetId, newNode)
        }

        // ✅ 移动已有组件
        if (dragged?.type === 'existing-component') {
            // 移动的是组件树内的节点
            // moveComponent(dragged.id, dropTargetId)
        }

        setDraggingComponent(null)
    }

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
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


