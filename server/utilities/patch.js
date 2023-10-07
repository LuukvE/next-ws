"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPatch = exports.getPatch = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("node:fs"));
const path = tslib_1.__importStar(require("node:path"));
const workspace_1 = require("./workspace");
/**
 * Get the Next WS patch version and Next.js version.
 * @returns The patch version and Next.js version if the patch has been applied, otherwise null.
 */
function getPatch() {
    const location = path.join((0, workspace_1.findWorkspaceRoot)(), 'node_modules/next/.next-ws-trace.json');
    try {
        const content = fs.readFileSync(location, 'utf8');
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
exports.getPatch = getPatch;
/**
 * Verify that the Next WS patch has been applied to Next.js.
 * @returns The patch version and Next.js version if the patch has been applied, otherwise null.
 */
function verifyPatch() {
    const patch = getPatch();
    if (!patch)
        throw new Error('Next.js has not been patched to support Next WS, please run `npx next-ws-cli@latest patch`');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageJson = require('next/package.json');
    const version = packageJson.version.split('-')[0];
    if (patch.version !== version)
        throw new Error(`Next.js version mismatch, expected ${patch.version} but found ${version}, try running \`npx next-ws-cli@latest patch\``);
}
exports.verifyPatch = verifyPatch;
