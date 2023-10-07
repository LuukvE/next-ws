/// <reference types="node" />
import { Server } from 'node:http';
import NextNodeServer from 'next/dist/server/next-server';
import type { SocketHandler } from './ws';
/**
 * Get the http.Server instance from the NextNodeServer.
 * @param nextServer The NextNodeServer instance.
 * @returns The http.Server instance.
 */
export declare function getHttpServer(nextServer: NextNodeServer): Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
/**
 * Resolve a pathname to a page.
 * @param nextServer The NextNodeServer instance.
 * @param pathname The pathname to resolve.
 * @returns The resolved page, or null if the page could not be resolved.
 */
export declare function resolvePathname(nextServer: NextNodeServer, pathname: string): string | null;
/**
 * Get the page module for a page.
 * @param nextServer The NextNodeServer instance.
 * @param filename The filename of the page.
 * @returns The page module.
 */
export declare function getPageModule(nextServer: NextNodeServer, filename: string): Promise<PageModule>;
export interface PageModule {
    routeModule?: {
        userload?: {
            SOCKET?: SocketHandler;
        };
        userland?: {
            SOCKET?: SocketHandler;
        };
    };
}
