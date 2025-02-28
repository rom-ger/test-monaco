import React, { useEffect } from 'react';
import { MonacoWrap, Root } from './test.styles';

import { EditorAppExtended } from 'monaco-editor-wrapper';

import { config } from './config';
import { initVScodeServices } from './vscode';

export const TestPage = () => {

    useEffect(() => {
        init();
    });

    const init = async () => {
        // @ts-ignore
        await initVScodeServices({ userConfig: config });

        // @ts-ignore
        const editorApp = new EditorAppExtended(config.id, config);

        const element = document.getElementById('monaco-wrap');
        if (!element) {
            return;
        }
        await editorApp.init();
        await editorApp.createEditors(element);
    };

    return <Root>
        test
        <MonacoWrap id="monaco-wrap" />
    </Root>;
};
