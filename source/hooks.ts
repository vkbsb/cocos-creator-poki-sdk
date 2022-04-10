import { IBuildTaskOption, BuildHook, IBuildResult } from '../@types';
import { writeFileSync } from 'fs-extra' 
import path from 'path'

interface IOptions {
    siteLock:string;
}

const PACKAGE_NAME = 'poki-sdk';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'poki-sdk': IOptions;
    };
}

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError: BuildHook.throwError = true;

export const load: BuildHook.load = async function() {
    console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request('asset-db', 'query-assets');
};

export const onBeforeBuild: BuildHook.onAfterBuild = async function(options) {
    // Todo some thing
    log(options.packages[PACKAGE_NAME])

    const pkgOptions = options.packages[PACKAGE_NAME];
    log("SiteLock:", pkgOptions.siteLock)

    //put a SiteLock.js file in the web-mobile folder along with index.ejs file. 
    let siteLockFileContents = "(function SiteLock(){" + pkgOptions.siteLock + "})();"
    if(options.debug){
        siteLockFileContents = "(function SiteLock(){ console.log('SiteLock disabled in debug build'); })();"
    }

    const project_path = Editor.Project.path
    const build_templates_dir = "build-templates"
    const build_platform_dir = "web-mobile"
    const sitelock_file = "sitelock.js"
    writeFileSync(path.join(project_path, build_templates_dir, build_platform_dir, sitelock_file), siteLockFileContents)
};

export const onBeforeCompressSettings: BuildHook.onBeforeCompressSettings = async function(options, result) {
    // Todo some thing
    console.debug('get settings test', result.settings);
};

export const onAfterCompressSettings: BuildHook.onAfterCompressSettings = async function(options, result) {
    // Todo some thing
    console.log('webTestOption', 'onAfterCompressSettings');
};

export const onAfterBuild: BuildHook.onAfterBuild = async function(options, result) {

};

export const unload: BuildHook.unload = async function() {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
};
