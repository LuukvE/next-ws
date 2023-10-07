"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hookNextNodeServer = exports.setupWebSocketServer = void 0;
const tslib_1 = require("tslib");
const Log = tslib_1.__importStar(require("next/dist/build/output/log"));
const next_1 = require("./utilities/next");
const ws_1 = require("./utilities/ws");
function setupWebSocketServer(nextServer) {
    const httpServer = (0, next_1.getHttpServer)(nextServer);
    const wsServer = (0, ws_1.getWsServer)();
    Log.ready('[next-ws] websocket server started successfully');
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    httpServer.on('upgrade', async (request, socket, head) => {
        const url = new URL(request.url ?? '', 'ws://next');
        const pathname = url.pathname;
        if (pathname.startsWith('/_next'))
            return;
        const fsPathname = (0, next_1.resolvePathname)(nextServer, pathname);
        if (!fsPathname) {
            Log.error(`[next-ws] could not find module for page ${pathname}`);
            return socket.destroy();
        }
        const pageModule = await (0, next_1.getPageModule)(nextServer, fsPathname);
        if (!pageModule) {
            Log.error(`[next-ws] could not find module for page ${pathname}`);
            return socket.destroy();
        }
        const socketHandler = pageModule?.routeModule?.userload?.SOCKET || pageModule?.routeModule?.userland?.SOCKET;
        if (!socketHandler || typeof socketHandler !== 'function') {
            Log.error(`[next-ws] ${pathname} does not export a SOCKET handler`);
            return socket.destroy();
        }
        return wsServer.handleUpgrade(request, socket, head, (client, request) => void socketHandler(client, request, wsServer));
    });
}
exports.setupWebSocketServer = setupWebSocketServer;
// Next WS versions below 0.2.0 used a different method of setup
// This remains for backwards compatibility, but may be removed in a future version
function hookNextNodeServer() {
    setupWebSocketServer(this);
}
exports.hookNextNodeServer = hookNextNodeServer;
