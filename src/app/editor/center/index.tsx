import { componentRegistry } from '../../registry/componentRegistry'
// import { ComponentWrapper } from '../components/ComponentWrapper'
import { ComponentNode, ComponentTree } from '@/store/editor/types'
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';

import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { SortableItem } from '../components/SortableItem'
import { useEditorStore } from '@/store/editor';

// 渲染单个组件的递归函数
const renderComponent = (node: ComponentNode, nodeMap: Record<string, ComponentNode>) => {
    // 获取当前组件的props
    const { type, props, children } = node;
    let element: React.ReactNode = null;

    // 根据类型渲染不同的元素
    switch (type) {
        case 'container':
            // 渲染容器组件，包含递归渲染子组件
            element = (
                <SortableContext items={children ?? []} strategy={rectSortingStrategy}>
                    <div style={props.style} key={node.id} >
                        {children?.map((childId) => (
                            <SortableItem key={childId} id={childId}>
                                {renderComponent(nodeMap[childId], nodeMap)}
                            </SortableItem>
                        ))}
                    </div>
                </SortableContext>

            );
            break;
        case 'button':
            // 渲染按钮组件
            element = (
                <button style={props.style} key={node.id}>
                    {props.text}
                </button>
            );
            break;
        case 'text':
            // 渲染文本组件
            element = (
                <p style={props.style} key={node.id}>
                    {props.content}
                </p>
            );
            break;
        case 'image':
            // 渲染图片组件
            element = (
                <img src={props.src} style={props.style} alt={props.src} key={node.id} />
            );
            break;
        case 'input':
            // 渲染输入框组件
            element = (
                <input type="text" placeholder={props.placeholder} style={props.style} key={node.id} />
            );
            break;
        default:
            break;
    }

    return element;
};



const CanvasRenderer = (props: any) => {
    const componentTree = useEditorStore(state => state.componentTree)
    const { setNodeRef } = useDroppable({ id: 'canvas' })


    const nodeMap = componentTree.nodeMap;

    const rootNode = nodeMap[componentTree.rootId];

    if (!rootNode) return <div style={{ color: 'red' }}>未知组件: error</div>


    console.log('log==componentTree=>>>', componentTree)
    return (

        <div
            ref={setNodeRef}
            className="w-full h-full bg-gray-50 p-4 overflow-auto border root-container"
            id="editor-canvas"
            style={{
                border: '3px solid blue'
            }}
        >

            {
                renderComponent(rootNode, nodeMap)
            }

        </div >


    )
};

export default CanvasRenderer;