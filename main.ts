import { Plugin, TFile, Notice } from 'obsidian';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default class CopyFilePlugin extends Plugin {
    async onload() {
        // Add right-click menu
        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                if (file instanceof TFile) {
                    menu.addItem((item) => {
                        item
                            .setTitle('Copy as file')
                            .setIcon('copy')
                            .onClick(async () => {
                                await this.copyFile(file);
                            });
                    });
                }
            })
        );

        // Add command
        this.addCommand({
            id: 'copy-file-command',
            name: 'Copy file to system clipboard',
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (file) await this.copyFile(file);
            }
        });

        console.log('Copy File plugin loaded');
    }

    async copyFile(file: TFile) {
        try {
            const path = this.app.vault.adapter.getFullPath(file.path);
            
            if (process.platform === 'win32') {
                // Windows: Copy the actual file to clipboard
                const psPath = path.replace(/'/g, "''");
                await execAsync(
                    `powershell -NoProfile -Command "Set-Clipboard -Path '${psPath}'"`
                );
                new Notice(`Copied: ${file.name}\nPaste in Explorer to copy file`);
            } else if (process.platform === 'darwin') {
                // macOS: Use pbcopy
                await execAsync(`echo "${path}" | pbcopy`);
                new Notice(`Copied: ${file.name}\nPath is in clipboard`);
            } else {
                // Linux: Use xclip
                await execAsync(`echo "${path}" | xclip -selection clipboard`);
                new Notice(`Copied: ${file.name}`);
            }
        } catch (error) {
            new Notice(`Error copying file: ${error}`);
        }
    }
}
