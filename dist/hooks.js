"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'poki-sdk';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
let allAssets = [];
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
        allAssets = yield Editor.Message.request('asset-db', 'query-assets');
    });
};
exports.load = load;
const onBeforeBuild = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        log(options.packages[PACKAGE_NAME]);
        const pkgOptions = options.packages[PACKAGE_NAME];
        log("SiteLock:", pkgOptions.siteLock);
        //put a SiteLock.js file in the web-mobile folder along with index.ejs file. 
        let siteLockFileContents = "(function SiteLock(){" + pkgOptions.siteLock + "})();";
        if (options.debug) {
            siteLockFileContents = "(function SiteLock(){ console.log('SiteLock disabled in debug build'); })();";
        }
        const project_path = Editor.Project.path;
        const build_templates_dir = "build-templates";
        const build_platform_dir = "web-mobile";
        const sitelock_file = "sitelock.js";
        fs_extra_1.writeFileSync(path_1.default.join(project_path, build_templates_dir, build_platform_dir, sitelock_file), siteLockFileContents);
    });
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.debug('get settings test', result.settings);
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.log('webTestOption', 'onAfterCompressSettings');
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
    });
};
exports.unload = unload;
