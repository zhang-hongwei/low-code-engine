'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const D = dynamic(() => import('./d'), {
    ssr: false,
})

const TestPage = () => {
    return (
        <D>

        </D>
    )
}

export default TestPage