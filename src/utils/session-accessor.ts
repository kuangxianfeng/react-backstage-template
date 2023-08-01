/* eslint-disable class-methods-use-this */
import type { SessionStorageTypes, SessionKeyTypes } from "../config/session-types"
import { SESSION_STORAGE_PREFIX } from '../config/session-types'

const ss = window.sessionStorage

/**
 * @description 重点在于 `../config/session-types`，将存储的类型提前定义才能有类型校验
 */
class SessionAccessor {
    get<T extends SessionKeyTypes>(key: T): SessionStorageTypes[T]
    get<T extends SessionKeyTypes>(key: T[]): Pick<SessionStorageTypes, T>
    /**
     * @description 获取 `sessionStorage` 里面的值，支持传数组，以对象的形式返回
     * @param {T|T[]} key
     */
    get<T extends SessionKeyTypes>(key: T | T[]) {
        if (typeof key === 'string') {
            const value = ss.getItem(this.addPrefix(key))
            return value ? JSON.parse(value) : null
        }
        const o: Record<string, unknown> = {} as Pick<SessionStorageTypes, T>
        key.forEach(item => {
            const value = ss.getItem(this.addPrefix(item))
            o[item] = value ? JSON.parse(value) : null
        })
        return o as Pick<SessionStorageTypes, T>
    }
    /**
     * @description 设置 `sessionStorage` 里面的值，排除 `null` 和 `undefined`
     * @param {T|T[]} key
     * @param data
     */
    set<T extends SessionKeyTypes>(key: T, data: SessionStorageTypes[T]) {
        if ((data ?? '') !== '') {
            ss.setItem(this.addPrefix(key), JSON.stringify(data))
        }
    }
    /**
     * @description 移除 `sessionStorage` 里面的值，先调用 `this.get`，如果没有则不移除
     * @param key
     */
    remove<T extends SessionKeyTypes>(key: T | T[]) {
        if (typeof key === 'string') {
            this.get(key) && ss.removeItem(this.addPrefix(key))
        } else {
            key.forEach(item => this.get(item) && ss.removeItem(this.addPrefix(item)))
        }
    }
    /**
     * @description 清除 sessionStorage
     */
    clear() {
        ss.clear()
    }
    /**
     * @description 是否添加前缀，避免同域撞名
     * @param {String} key
     * @returns
     */
    private addPrefix<T extends SessionKeyTypes>(key: T): `${typeof SESSION_STORAGE_PREFIX}${T}` {
        return `${SESSION_STORAGE_PREFIX}${key}`
    }
}
export { SessionAccessor }
export default new SessionAccessor()
