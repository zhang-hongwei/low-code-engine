'use client'
import {

    useDroppable,
} from '@dnd-kit/core'

import { useEditorStore } from '@/app/store/editor'
import { CanvasRenderer } from '../CanvasRenderer'
import { useEffect } from 'react'


export const EditorCanvas = () => {
    const { componentTree } = useEditorStore()
    const { setNodeRef } = useDroppable({ id: 'canvas' })

    return (
        <div
            ref={setNodeRef}
            className="w-full h-full bg-gray-50 p-4 overflow-auto border"
            id="editor-canvas"
        >
            <CanvasRenderer node={componentTree} />
        </div>
    )
}
