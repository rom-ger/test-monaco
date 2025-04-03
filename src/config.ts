import * as monaco from 'monaco-editor';
import getViewsServiceOverride from '@codingame/monaco-vscode-views-service-override';
import getFilesServiceOverride from '@codingame/monaco-vscode-files-service-override';
import getModelServiceOverride from '@codingame/monaco-vscode-model-service-override';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override';
import getDebugServiceOverride from '@codingame/monaco-vscode-debug-service-override';
// import getOutputServiceOverride from '@codingame/monaco-vscode-output-service-override';
import getStorageServiceOverride from '@codingame/monaco-vscode-storage-service-override';
import getLanguagesServiceOverride from '@codingame/monaco-vscode-languages-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';


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
                ...getFilesServiceOverride(),
                ...getDebugServiceOverride(),
                // ...getOutputServiceOverride(),
                ...getViewsServiceOverride(),
                ...getStorageServiceOverride({
                    fallbackOverride: {
                        'workbench.activity.showAccounts': false
                    }
                }),
                ...getTextmateServiceOverride(),
                ...getThemeServiceOverride(),
                ...getKeybindingsServiceOverride({ shouldUseGlobalKeybindings: () => false }),
                ...getModelServiceOverride(),
                ...getLanguagesServiceOverride(),
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
