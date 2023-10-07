"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findWorkspaceRoot = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("node:fs"));
const path = tslib_1.__importStar(require("node:path"));
const cache = new Map();
function findWorkspaceRoot(initalPath = process.cwd()) {
    let currentPath = initalPath;
    let lastPossiblePath = currentPath;
    let isRoot = 'maybe';
    const isCurrentPathRoot = () => {
        const files = fs.readdirSync(currentPath);
        const lockFiles = ['pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'];
        const hasLockFile = files.some((file) => lockFiles.includes(file));
        if (hasLockFile)
            return 'true';
        const packageJson = files.find((file) => file === 'package.json');
        if (packageJson) {
            const packageContent = fs.readFileSync(path.resolve(currentPath, packageJson), 'utf8');
            const packageObject = JSON.parse(packageContent);
            if (packageObject.packageManager)
                return 'true';
            return 'maybe';
        }
        return 'false';
    };
    const shouldContinue = true;
    while (shouldContinue) {
        if (cache.has(currentPath))
            return cache.get(currentPath);
        isRoot = isCurrentPathRoot();
        const nextPath = path.resolve(currentPath, '..');
        if (isRoot === 'true' || nextPath === currentPath)
            break;
        else if (isRoot === 'maybe')
            lastPossiblePath = currentPath;
        currentPath = nextPath;
    }
    const finalPath = isRoot === 'true' ? currentPath : lastPossiblePath;
    cache.set(initalPath, finalPath);
    return finalPath;
}
exports.findWorkspaceRoot = findWorkspaceRoot;
