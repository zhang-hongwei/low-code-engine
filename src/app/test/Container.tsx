import React from "react";
import { CSS } from "@dnd-kit/utilities";
import {
    SortableContext,
    useSortable,
} from "@dnd-kit/sortable";

export default function Container({ id, items, children }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isOver
    } = useSortable({ id });

    const containerStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 15,
        margin: 5,
        flex: 1,
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: 5,
        userSelect: "none",
        cursor: "grab",
        boxSizing: "border-box",
        minHeight: 100,
        background: isOver ? "green" : "#dadada"
    };

    return (
        <SortableContext
            id={id}
            items={items}
        >
            <div
                ref={setNodeRef}
                style={containerStyle}
                {...attributes}
                {...listeners}
            >
                {children}
            </div>
        </SortableContext>
    );
}
