import React, { useEffect, useRef } from 'react';
import { MonacoWrap, Root } from './test.styles';

import { initialize, monaco, registerFile, registerServices } from '@codingame/monaco-editor-wrapper';
import { RegisteredMemoryFile } from '@codingame/monaco-vscode-files-service-override';
import { registerExtension } from '@codingame/monaco-vscode-api/extensions';

import { config } from './config';


const FILE_URI = 'file.js';
const LANGUAGE = 'javascript';
const CODE = '';

export const TestPage = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            if (!containerRef.current) {
                return;
            }

            registerServices(config.wrapperConfig.serviceConfig.userServices);
            registerExtension({
                name: 'js',
                publisher: 'publisher',
                version: '1.0.0',
                engines: {
                    vscode: '*'
                },
                browser: 'extension.js',
                contributes: {
                    debuggers: [
                        {
                            type: 'js',
                            label: 'JS Debugger',
                            languages: [LANGUAGE],
                        }
                    ],
                    breakpoints: [
                        {
                            language: LANGUAGE
                        }
                    ]
                }
            });

            await initialize({
                
            }, containerRef.current);

            const uri = monaco.Uri.file(FILE_URI);

            registerFile(new RegisteredMemoryFile(uri, CODE));
            const modelRef = await monaco.editor.createModelReference(uri, CODE);
            monaco.editor.create(containerRef.current, {
                model: modelRef.object.textEditorModel,
                language: LANGUAGE
            });
        })();
    }, []);

    return (
        <Root>
            <h1>test</h1>

            <MonacoWrap
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </Root>
    );
};
