/**
 * Get the Next WS patch version and Next.js version.
 * @returns The patch version and Next.js version if the patch has been applied, otherwise null.
 */
export declare function getPatch(): {
    patch: string;
    version: string;
} | null;
/**
 * Verify that the Next WS patch has been applied to Next.js.
 * @returns The patch version and Next.js version if the patch has been applied, otherwise null.
 */
export declare function verifyPatch(): void;
