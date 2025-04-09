'use client'
import dynamic from "next/dynamic";
const EditorCanvas = dynamic(() => import('./edit'), { ssr: false });

const EditorPage = () => {
    return (
        <EditorCanvas />

    );
};

export default EditorPage;