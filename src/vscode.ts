import * as monaco from 'monaco-editor';
import { initServices } from 'monaco-languageclient/vscode/services';
import { config } from './config';

export type MonacoEditorUserConfig = typeof config;

export const checkServiceConsistency = (userServices?: monaco.editor.IEditorOverrideServices) => {
    const haveThemeService = Object.keys(userServices ?? {}).includes('themeService');
    const haveTextmateService = Object.keys(userServices ?? {}).includes('textMateTokenizationFeature');
    const haveMarkersService = Object.keys(userServices ?? {}).includes('markersService');
    const haveViewsService = Object.keys(userServices ?? {}).includes('viewsService');

    // theme requires textmate
    if (haveThemeService && !haveTextmateService) {
        throw new Error('"theme" service requires "textmate" service. Please add it to the "userServices".');
    }

    // markers service requires views service
    if (haveMarkersService && !haveViewsService) {
        throw new Error('"markers" service requires "views" service. Please add it to the "userServices".');
    }

    // we end up here if no exceptions were thrown
    return true;
};


export const initVScodeServices = async (args: {
    userConfig: MonacoEditorUserConfig;
}) => {
    const { userConfig } = args;

    await initServices({
        serviceConfig: userConfig.wrapperConfig.serviceConfig,
        caller: `monaco-editor (${userConfig.id})`,
        performChecks: checkServiceConsistency
    });
};
