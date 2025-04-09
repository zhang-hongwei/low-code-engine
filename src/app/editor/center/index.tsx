
import { useDrop } from 'react-dnd';
import { useState } from 'react';
import { Box } from "@mui/material";

const Center = () => {
    const [components, setComponents] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'component',
        drop: (item) => {
            setComponents((prev) => [...prev, item]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <Box ref={drop} className={`p-4 border ${isOver ? 'bg-gray-200' : ''}`} sx={{ minHeight: '300px', border: '1px solid red' }}>
            <h2>Center Component</h2>
            {components.map((component, index) => (
                <div key={index} className="p-2 border mt-2">
                    {component.type}
                </div>
            ))}
        </Box>
    );
};

export default Center;