import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Item from "./Item";

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    minHeight: 30,
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    border: "1px solid gray",
    borderRadius: 5,
    marginBottom: 5,
    userSelect: "none",
    cursor: "grab",
    boxSizing: "border-box",
    background: "white"
  };

  return (
    <Item
      ref={setNodeRef}
      style={itemStyle}
      id={id}
      {...attributes}
      {...listeners}
    >
      {children}
    </Item>
  );
};

export default SortableItem;
