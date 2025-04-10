
import { nanoid } from 'nanoid'

export const createNewComponentNode = (dragged: any) => {
    return {
        id: nanoid(), // 使用 nanoid() 生成唯一 ID
        type: dragged.component.type,
        props: {
            id: dragged.component.id,
            name: dragged.component.name,
            type: dragged.component.type,
            additionalProp: dragged.component.additionalProp,
        },
        children: dragged.component.type === 'container' ? [] : undefined,
    }
}
