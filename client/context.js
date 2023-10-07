"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebSocket = exports.WebSocketConsumer = exports.WebSocketProvider = exports.WebSocketContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.WebSocketContext = (0, react_1.createContext)(null);
exports.WebSocketContext.displayName = 'WebSocketContext';
/**
 * Provides a WebSocket instance to its children via context,
 * allowing for easy access to the WebSocket from anywhere in the app.
 * @param props WebSocket parameters and children.
 * @returns JSX Element
 */
function WebSocketProvider({ children, url, protocols, binaryType, }) {
    const isBrowser = typeof window !== 'undefined';
    const instance = (0, react_1.useMemo)(() => {
        if (!isBrowser)
            return null;
        const client = new WebSocket(url, protocols);
        if (binaryType)
            client.binaryType = binaryType;
        return client;
    }, [isBrowser, url, protocols]);
    (0, react_1.useEffect)(() => {
        return () => instance?.close();
    }, []);
    return (0, jsx_runtime_1.jsx)(exports.WebSocketContext.Provider, { value: instance, children: children });
}
exports.WebSocketProvider = WebSocketProvider;
exports.WebSocketConsumer = exports.WebSocketContext.Consumer;
/**
 * Access the websocket from anywhere in the app, so long as it's wrapped in a WebSocketProvider.
 * @returns WebSocket instance when connected, null when disconnected.
 */
function useWebSocket() {
    const context = (0, react_1.useContext)(exports.WebSocketContext);
    if (context === undefined)
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    return context;
}
exports.useWebSocket = useWebSocket;
