"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const PACKAGE_NAME = 'poki-build';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
const load = () => {
    log("ProjectPath:", Editor.Project.path);
    const preview_template_dir = "preview-template";
    const build_templates_dir = "build-templates";
    const project_path = Editor.Project.path;
    const templates_dir = path_1.default.join(Editor.Project.path, "extensions/" + PACKAGE_NAME + "/templates/");
    const assets_dir = path_1.default.join(project_path, "assets");
    const copy_list = [
        {
            src: path_1.default.join(templates_dir, preview_template_dir),
            dest: path_1.default.join(project_path, preview_template_dir)
        },
        {
            src: path_1.default.join(templates_dir, build_templates_dir),
            dest: path_1.default.join(project_path, build_templates_dir)
        },
        {
            src: path_1.default.join(templates_dir, "poki-api"),
            dest: path_1.default.join(assets_dir, "poki-api")
        },
        {
            src: path_1.default.join(templates_dir, "demo"),
            dest: path_1.default.join(assets_dir, "demo")
        }
    ];
    copy_list.forEach((value) => {
        if (fs_extra_1.pathExistsSync(value.dest) == false) {
            fs_extra_1.copySync(value.src, value.dest);
        }
        else {
            console.log("Skipping:", value.dest);
        }
    });
};
exports.load = load;
const unload = () => {
    console.log("Poki plugin-disabled");
};
exports.unload = unload;
