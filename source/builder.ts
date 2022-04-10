
import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function() {
    console.debug('poki-sdk load');
};

export const unload: BuildPlugin.load = function() {
    console.debug('poki-sdk unload');
};

export const configs: BuildPlugin.Configs = {
    'web-mobile': {
        hooks: './hooks',
        options: {
            siteLock: {
                label: 'i18n:poki-sdk.options.siteLock',
                default: 'console.log("SiteLock not setup!");',
                render: {
                    ui: 'ui-input',
                    attributes: {
                        placeholder: 'Enter site lock code',
                    },
                },
                verifyRules: [],
            }
        },
        verifyRuleMap: {
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
