import * as monaco from 'monaco-editor';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override';

export const config = {
    id: '123',
    wrapperConfig: {
        serviceConfig: {
            workspaceConfig: {
                workspaceProvider: {
                    open: async () => false,
                    trusted: true,
                    workspace: {
                        workspaceUri: monaco.Uri.file('workspace')
                    }
                }
            },
            userServices: {
                ...getConfigurationServiceOverride(),
                ...getTextmateServiceOverride(),
                ...getThemeServiceOverride(),
            }
        },
        editorAppConfig: {
            useDiffEditor: false,
            $type: 'extended',
            languageId: 'javascript',
            code: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
            codeUri: '/workspace/folder/file.path',
        }
    }
};
