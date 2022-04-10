"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetHandlers = exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    console.debug('poki-sdk load');
};
exports.load = load;
const unload = function () {
    console.debug('poki-sdk unload');
};
exports.unload = unload;
exports.configs = {
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
        verifyRuleMap: {},
    },
};
exports.assetHandlers = './asset-handlers';
