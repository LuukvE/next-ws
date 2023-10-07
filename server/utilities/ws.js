"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWsServer = void 0;
/* eslint-disable @typescript-eslint/consistent-type-imports */
const ws_1 = require("ws");
/**
 * Get the WebSocketServer instance.
 * @returns The WebSocketServer instance.
 */
function getWsServer() {
    return new ws_1.WebSocketServer({ noServer: true });
}
exports.getWsServer = getWsServer;
