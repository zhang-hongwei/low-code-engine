import { componentRegistry } from '../registry/componentRegistry'
import { ComponentWrapper } from './ComponentWrapper'
import { ComponentNode, } from '../store/editor/types'
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';

export const CanvasRenderer = ({ node }: { node: ComponentNode }) => {
    const Component = componentRegistry[node.type]
    if (!Component) return <div style={{ color: 'red' }}>未知组件: {node.type}</div>



    console.log('log===CanvasRenderer===node===>>>', node)


    // 如果是容器组件，添加 Droppable 支持
    if (node.type === 'container') {
        const { setNodeRef } = useDroppable({ id: node.id }); // 使用节点 ID 作为 Droppable ID

        return (
            <ComponentWrapper node={node}>
                <div ref={setNodeRef} style={node.props.style} id={node.id} className={clsx('grid gap-4 w-full',)} data-type={node.type}>
                    <Component
                        props={{
                            ...node.props,
                            className: clsx(
                                {
                                    'grid grid-cols-1': node.id === 'root',
                                    'grid grid-cols-12': node.id !== 'root',
                                }
                            )
                        }}


                    >
                        {node.children?.map((child) => (
                            <CanvasRenderer key={child.id} node={child} />
                        ))}
                    </Component>
                </div>
            </ComponentWrapper>
        );
    }



    return (
        <ComponentWrapper node={node}>
            <Component props={{ ...node.props }}>
                {node.children?.map(child => (
                    <CanvasRenderer key={child.id} node={child} />
                ))}
            </Component>
        </ComponentWrapper>
    )
}
