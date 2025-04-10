'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const BoardSectionList = dynamic(() => import('./components/BoardSectionList'), {
    ssr: false,
})

const TestPage = () => {
    return (
        <BoardSectionList />
    )
}

export default TestPage