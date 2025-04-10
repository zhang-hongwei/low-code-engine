import React from 'react'
import { useEditorStore } from '@/store/editor'

export const GridItemPropsPanel = () => {
    const activeId = useEditorStore(state => state.activeId)
    const node = useEditorStore(state => state.componentTree.nodeMap[activeId ?? ''])
    const updateNodeProps = useEditorStore(state => state.updateNodeProps)

    if (!node) return <div>请选择一个组件</div>

    const style = node.props.style || {}

    const handleChange = (key: string, value: string) => {
        console.log('og==componentTree=>11', key, value)
        updateNodeProps(node.id, {
            style: {
                ...style,
                [key]: value,
            },
        })
    }
    return (
        <div className="p-4 space-y-3 bg-white rounded shadow">
            <h3 className="font-bold text-lg">Grid 子项布局</h3>

            <div

            >
                <label>gridColumn（列位置）</label>
                <input
                    type="text"
                    value={style.gridTemplateColumns || ''}
                    onChange={e => handleChange('gridTemplateColumns', e.target.value)}
                    placeholder="如：1 / span 2 或 2 / 4"
                />
            </div>

            <div>
                <label>gridRow（行位置）</label>
                <input
                    type="text"
                    value={style.gridRow || ''}
                    onChange={e => handleChange('gridRow', e.target.value)}
                    placeholder="如：1 / span 1"
                />
            </div>

            <div>
                <label>对齐方式（justifySelf）</label>
                <select value={style.justifySelf || 'auto'} onChange={e => handleChange('justifySelf', e.target.value)}>
                    <option value="start">start</option>
                    <option value="center">center</option>
                    <option value="end">end</option>
                    <option value="stretch">stretch</option>
                    <option value="auto">auto</option>
                </select>
            </div>

            <div>
                <label>垂直对齐（alignSelf）</label>
                <select value={style.alignSelf || 'auto'} onChange={e => handleChange('alignSelf', e.target.value)}>
                    <option value="start">start</option>
                    <option value="center">center</option>
                    <option value="end">end</option>
                    <option value="stretch">stretch</option>
                    <option value="auto">auto</option>
                </select>
            </div>
        </div>
    )
}
