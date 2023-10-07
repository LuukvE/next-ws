"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageModule = exports.resolvePathname = exports.getHttpServer = void 0;
const tslib_1 = require("tslib");
const node_http_1 = require("node:http");
const next_server_1 = tslib_1.__importDefault(require("next/dist/server/next-server"));
/**
 * Get the http.Server instance from the NextNodeServer.
 * @param nextServer The NextNodeServer instance.
 * @returns The http.Server instance.
 */
function getHttpServer(nextServer) {
    if (!nextServer || !(nextServer instanceof next_server_1.default))
        throw new Error('Next WS is missing access to the NextNodeServer');
    // @ts-expect-error - serverOptions is protected
    const httpServer = nextServer.serverOptions?.httpServer;
    if (!httpServer || !(httpServer instanceof node_http_1.Server))
        throw new Error('Next WS is missing access to the http.Server');
    return httpServer;
}
exports.getHttpServer = getHttpServer;
/**
 * Resolve a pathname to a page.
 * @param nextServer The NextNodeServer instance.
 * @param pathname The pathname to resolve.
 * @returns The resolved page, or null if the page could not be resolved.
 */
function resolvePathname(nextServer, pathname) {
    if (pathname.startsWith('/_next'))
        return null;
    const pathParts = pathname.split('/');
    const appRoutes = {
        // @ts-expect-error - appPathRoutes is protected
        ...nextServer.appPathRoutes,
        // @ts-expect-error - getAppPathRoutes is protected
        ...nextServer.getAppPathRoutes(),
    };
    for (const [key, [path]] of Object.entries(appRoutes)) {
        const hasDynamic = key.includes('[') && key.includes(']');
        if (hasDynamic) {
            const keyParts = key.split('/');
            if (keyParts.length !== pathParts.length)
                continue;
            for (let i = 0; i < keyParts.length; i++) {
                const keyPart = keyParts[i];
                const pathPart = pathParts[i];
                const isDynamic = keyPart.includes('[') && keyPart.includes(']');
                if (isDynamic)
                    keyParts[i] = pathPart;
                if (keyParts[i] !== pathParts[i])
                    break;
                if (i === keyParts.length - 1) {
                    if (!path?.endsWith('/route'))
                        return null;
                    return path;
                }
            }
        }
        else {
            if (key !== pathname)
                continue;
            if (!path?.endsWith('/route'))
                return null;
            return path;
        }
    }
    return null;
}
exports.resolvePathname = resolvePathname;
/**
 * Get the page module for a page.
 * @param nextServer The NextNodeServer instance.
 * @param filename The filename of the page.
 * @returns The page module.
 */
async function getPageModule(nextServer, filename) {
    // @ts-expect-error - hotReloader is private
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await nextServer.hotReloader?.ensurePage({
        page: filename,
        clientOnly: false,
    });
    // @ts-expect-error - getPagePath is protected
    const builtPagePath = nextServer.getPagePath(filename);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(builtPagePath);
}
exports.getPageModule = getPageModule;
