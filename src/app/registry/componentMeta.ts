export interface ComponentMeta {
    type: string
    name: string
    icon?: string
    defaultProps?: Record<string, any>
}

export const componentMetaList: ComponentMeta[] = [
    {
        type: 'button',
        name: '按钮',
        defaultProps: {
            text: '点击我',
            style: { background: 'blue', color: 'white', width: '100px' },
        },
    },
    {
        type: 'container',
        name: '容器',
        defaultProps: {
            style: {
                padding: '10px',
                border: '1px dashed #aaa',


            },
        },
    },
]
