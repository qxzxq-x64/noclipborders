# NoClipBorders Obsidian Plugin

Copy a file to the system clipboard from Obsidian so you can paste it outside Obsidian.

## Features
- Right-click a file and choose `Copy as file`
- Command palette: `Copy file to system clipboard`

On Windows, this copies the actual file (not just the Obsidian path), so you can paste into other places to duplicate it.

## Installation (Development)
1. Clone this repo into your vault at:
   `.obsidian/plugins/obsidian-copy-file`
2. Install dependencies:
   `npm install`
3. Build:
   `npm run build`
4. In Obsidian, enable the plugin in Settings -> Community Plugins (toggle on).

## Usage
1. In the file explorer, right-click any file -> `Copy as file`
2.The file will be in the clipboard

## Build
This plugin bundles `main.ts` with esbuild and outputs `main.js`.

```
npm run build
```
