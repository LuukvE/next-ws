/// <reference types="ws" />
/// <reference types="node" />
/** A function that handles a WebSocket connection. */
export type SocketHandler = (
/** The WebSocket client that connected. */
client: import('ws').WebSocket, 
/** The HTTP request that initiated the WebSocket connection. */
request: import('http').IncomingMessage, 
/** The WebSocket server. */
server: import('ws').WebSocketServer) => unknown;
/**
 * Get the WebSocketServer instance.
 * @returns The WebSocketServer instance.
 */
export declare function getWsServer(): import("ws").Server<typeof import("ws"), typeof import("http").IncomingMessage>;
