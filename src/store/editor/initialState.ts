import { EditorState } from "./types";

export const initialState: EditorState = {
    componentTree: {
        rootId: 'root',
        nodeMap: {
            "root": {
                "id": "root",
                "type": "container",
                "props": {
                    "style": {
                        "padding": "20px"
                    }
                },
                "children": [
                    "btn1",
                    "9b-j9jEMM-jpaRmnwi5sF",
                    "yLkea0iQZL63NPujG7iZI"
                ]
            },
            "btn1": {
                "id": "btn1",
                "type": "button",
                "parentId": "root",
                "props": {
                    "text": "立即开始",
                    "style": {
                        "background": "blue",
                        "color": "white"
                    }
                }
            },
            "9b-j9jEMM-jpaRmnwi5sF": {
                "id": "9b-j9jEMM-jpaRmnwi5sF",
                "type": "button",
                "parentId": "root",
                "props": {
                    "style": {
                        "background": "red",
                        "color": "white",
                        "border": "1px solid red",
                        "borderRadius": "5px",
                        "padding": "10px"
                    },
                    "text": "test"
                }
            },
            "yLkea0iQZL63NPujG7iZI": {
                "id": "yLkea0iQZL63NPujG7iZI",
                "type": "container",
                "props": {
                    "name": "容器",
                    "text": "容器",
                    "style": {
                        "border": "1px solid red",
                        "minHeight": "50px",
                        "borderRadius": "5px",
                        "backgroundColor": "rgba(0,0,0,0.3)",
                        "padding": "10px",
                        "display": "grid",

                    }
                },
                "children": [
                    "2vZiMCwB57zLFyn2IgQ9V",
                    "HgmqSFi8i1gbq6p4jqqeS",
                    "L-JSZ4OyUIBszlI9LJRFu"
                ],
                "parentId": "root"
            },
            "2vZiMCwB57zLFyn2IgQ9V": {
                "id": "2vZiMCwB57zLFyn2IgQ9V",
                "type": "button",
                "props": {
                    "name": "按钮",
                    "text": "按钮"
                },
                "parentId": "yLkea0iQZL63NPujG7iZI"
            },
            "HgmqSFi8i1gbq6p4jqqeS": {
                "id": "HgmqSFi8i1gbq6p4jqqeS",
                "type": "button",
                "props": {
                    "name": "按钮",
                    "text": "按钮"
                },
                "parentId": "yLkea0iQZL63NPujG7iZI"
            },
            "L-JSZ4OyUIBszlI9LJRFu": {
                "id": "L-JSZ4OyUIBszlI9LJRFu",
                "type": "button",
                "props": {
                    "name": "按钮",
                    "text": "按钮"
                },
                "parentId": "yLkea0iQZL63NPujG7iZI"
            }
        },
    },
    activeId: null,
};







