'use client'
import { useDraggable } from '@dnd-kit/core'
import { componentMetaList } from '@/app/registry/componentMeta'


const PaletteItem = ({ meta }: { meta: any }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: meta.type,
    data: {
      type: 'new-component',
      component: meta,
    },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 bg-white rounded shadow cursor-move hover:bg-gray-100"
    >
      {meta.name}
    </div>
  )
}



export const ComponentPalette = () => {
  return (
    <div className="space-y-2">
      {componentMetaList.map((meta) => (
        <PaletteItem key={meta.type} meta={meta} />
      ))}
    </div>
  )
}
