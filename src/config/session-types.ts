export type SessionStorageTypes = {
    /**
     * @description token
     */
    token: string
}


export type SessionKeyTypes = keyof SessionStorageTypes

/**
 * @description 前缀，以防同域重名
 */
export const SESSION_STORAGE_PREFIX = ''