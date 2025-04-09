import { EditorState } from "./types";

export const initialState: EditorState = {

    componentTree: {
        id: 'root',
        type: 'container',
        props: { style: { padding: '20px' } },
        children: [
            {
                id: 'btn1',
                type: 'button',
                props: { text: '点击我11', style: { background: 'blue', color: 'white', width: '100px' } },
            },
        ],
    },
    selectedId: null,

};