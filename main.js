var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CopyFilePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_child_process = require("child_process");
var import_util = require("util");
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var CopyFilePlugin = class extends import_obsidian.Plugin {
  async onload() {
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof import_obsidian.TFile) {
          menu.addItem((item) => {
            item.setTitle("Copy as file").setIcon("copy").onClick(async () => {
              await this.copyFile(file);
            });
          });
        }
      })
    );
    this.addCommand({
      id: "copy-file-command",
      name: "Copy file to system clipboard",
      callback: async () => {
        const file = this.app.workspace.getActiveFile();
        if (file)
          await this.copyFile(file);
      }
    });
    console.log("Copy File plugin loaded");
  }
  async copyFile(file) {
    try {
      const path = this.app.vault.adapter.getFullPath(file.path);
      if (process.platform === "win32") {
        const psPath = path.replace(/'/g, "''");
        await execAsync(
          `powershell -NoProfile -Command "Set-Clipboard -Path '${psPath}'"`
        );
        new import_obsidian.Notice(`Copied: ${file.name}
Paste in Explorer to copy file`);
      } else if (process.platform === "darwin") {
        await execAsync(`echo "${path}" | pbcopy`);
        new import_obsidian.Notice(`Copied: ${file.name}
Path is in clipboard`);
      } else {
        await execAsync(`echo "${path}" | xclip -selection clipboard`);
        new import_obsidian.Notice(`Copied: ${file.name}`);
      }
    } catch (error) {
      new import_obsidian.Notice(`Error copying file: ${error}`);
    }
  }
};
