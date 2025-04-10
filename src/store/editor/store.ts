// sort-imports-ignore
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { StateCreator } from 'zustand/vanilla';

import { initialState } from './initialState';
import { EditorState } from './types';
import { EditorAction, EditorSlice } from './action';


export interface EditorStoreAction
    extends EditorAction, EditorState { }

export type EditorStore = EditorState;

const createStore: StateCreator<EditorStoreAction, [['zustand/devtools', never]]> = (...params) => ({
    ...initialState,
    ...EditorSlice(...params)
});

// const devtools = createDevtools('Editor');

export const useEditorStore = createWithEqualityFn<EditorStoreAction>()(
    subscribeWithSelector(devtools(createStore)),
    shallow,
);
