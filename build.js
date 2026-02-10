const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
    entryPoints: ['main.ts'],
    bundle: true,
    external: ['obsidian', 'electron'],
    format: 'cjs',
    platform: 'node',
    target: 'es2018',
    outfile: 'main.js',
    treeShaking: true,
}).catch(() => process.exit(1));