/// <reference types="react" />
export declare const WebSocketContext: import("react").Context<WebSocket | null>;
export interface WebSocketProviderProps {
    children: React.ReactNode;
    /** The URL for the WebSocket to connect to. */
    url: string;
    /** The subprotocols to use. */
    protocols?: string[] | string;
    /** The binary type to use. */
    binaryType?: BinaryType;
}
/**
 * Provides a WebSocket instance to its children via context,
 * allowing for easy access to the WebSocket from anywhere in the app.
 * @param props WebSocket parameters and children.
 * @returns JSX Element
 */
export declare function WebSocketProvider({ children, url, protocols, binaryType, }: WebSocketProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const WebSocketConsumer: import("react").Consumer<WebSocket | null>;
/**
 * Access the websocket from anywhere in the app, so long as it's wrapped in a WebSocketProvider.
 * @returns WebSocket instance when connected, null when disconnected.
 */
export declare function useWebSocket(): WebSocket | null;
