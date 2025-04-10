import React, { useState, useEffect } from "react";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";
import Container from "./Container";
import view from "./view";
import FieldRenderer from "./FieldRenderer";
import { View, IdTypes, IdArrays } from "./type"


const wrapperStyle = {
    display: "flex",
    flexDirection: "row"
};


const App = () => {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    function processView(view: View): { idArrays: IdArrays; idTypes: IdTypes } {
        const {
            pageData,
            sectionData,
            widgetData,
            fieldDefinitions
        } = view;

        const idArrays: IdArrays = {},
            idTypes: IdTypes = {};

        idArrays[pageData._id] = sectionData.map((section) => section._id);
        idTypes[pageData._id] = {
            type: "page",
            container: "",
            name: pageData.title
        };

        sectionData.forEach((section, index) => {
            idArrays[section._id] = section.content.map(
                (widget) => widget.widgets[0]
            );
            idTypes[section._id] = {
                type: "section",
                container: "page",
                name: `section ${index}`
            };
        });

        widgetData.forEach((widget, index) => {
            idArrays[widget._id] = widget.fields;
            idTypes[widget._id] = {
                type: "widget",
                container: "section",
                name: `widget ${index}`
            };
        });

        fieldDefinitions.forEach((field) => {
            idTypes[field._id] = {
                type: "field",
                container: "widget",
                name: field.label.value
            };
        });

        // 新增页面类型处理逻辑
        if (pageData.type === "newPageType") {
            idTypes[pageData._id].extraInfo = "This is a new page type";
            // 根据需要添加更多逻辑
        }

        return { idArrays, idTypes };
    }


    const { idArrays, idTypes } = processView(view);


    console.log('log1===>>>', idArrays, idTypes);

    const [items, setItems]: any = useState<any>(idArrays);



    const pageId = view.pageData._id;


    function findContainer(id: any, items: any) {
        return Object.keys(items).find((key) => items[key].includes(id));
    }

    function handleDragOver({ active, over }: any) {
        const id = active.id;
        const overId = over.id;

        // Find the containers
        const activeContainer: any = findContainer(id, items);
        const overContainer: any = findContainer(overId, items);

        console.log({
            id: idTypes[id] ? idTypes[id].name : null,
            overId: idTypes[overId] ? idTypes[overId].name : null,
            activeContainer: idTypes[activeContainer]
                ? idTypes[activeContainer].name
                : null,
            overContainer: idTypes[overContainer] ? idTypes[overContainer].name : null
        });

        //Do nothing if haven't moved out of current container
        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        //Move item to new container for the right container type
        if (
            idTypes[id] &&
            idTypes[overContainer] &&
            idTypes[id].container === idTypes[overContainer].type
        ) {
            setItems((prev: any) => {
                const activeItems = prev[activeContainer];
                const overItems = prev[overContainer];

                // Find the indexes for the items
                const activeIndex = activeItems.indexOf(id);
                const overIndex = overItems.indexOf(overId);

                let newIndex;

                const isBelowLastItem = over && overIndex === overItems.length - 1;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;

                return {
                    ...prev,
                    [activeContainer]: [
                        ...prev[activeContainer].filter((item: any) => item !== active.id)
                    ],
                    [overContainer]: [
                        ...prev[overContainer].slice(0, newIndex),
                        items[activeContainer][activeIndex],
                        ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                    ]
                };
            });

            return;
        }

        //Move item to new container for the right container type
        if (
            idTypes[id] &&
            idTypes[overId] &&
            idTypes[id].container === idTypes[overId].type &&
            !items[overId].length
        ) {
            setItems((prev: any) => {
                return {
                    ...prev,
                    [activeContainer]: [
                        ...prev[activeContainer].filter((item: any) => item !== active.id)
                    ],
                    [overId]: [active.id]
                };
            });

            return;
        }
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer: any = findContainer(id, items);
        const overContainer: any = findContainer(overId, items);

        console.log({
            id: idTypes[id] ? idTypes[id].name : null,
            overId: idTypes[overId] ? idTypes[overId].name : null,
            activeContainer: idTypes[activeContainer]
                ? idTypes[activeContainer].name
                : null,
            overContainer: idTypes[overContainer] ? idTypes[overContainer].name : null
        });

        //Only move if it's within the same container, HandleDragOver should have handled the moves between containers
        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            setItems((items: any) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

        // setActiveId(null);
    }


    useEffect(() => console.log({ items }), [items]);
    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}

        >
            <Container id={pageId} items={items[pageId]}>
                {items[pageId] &&
                    items[pageId].map((section: any) => {
                        return (
                            <Container id={section} items={items[section]} key={section}>
                                <div style={wrapperStyle}>
                                    {items[section] &&
                                        items[section].map((widget: any) => {
                                            return (
                                                <Container
                                                    id={widget}
                                                    items={items[widget]}
                                                    key={widget}
                                                >
                                                    {items[widget] &&
                                                        items[widget].map((field: any) => (
                                                            <SortableItem key={field} id={field}>
                                                                <FieldRenderer
                                                                    fieldId={field}
                                                                    viewData={view}
                                                                />
                                                            </SortableItem>
                                                        ))}
                                                </Container>
                                            );
                                        })}
                                </div>
                            </Container>
                        );
                    })}
            </Container>

        </DndContext>
    );


};

export default App;
