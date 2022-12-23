/* eslint-disable class-methods-use-this */
/**
 * sessionStorage存取器
 * 需要注意的是：
 * 1、在 set 方法里面是提供了 JSON.stringify ，如果在 set 的时候没有调用 JSON.stringify 在 get 的时候 就不应该使用 JSON.parse
 * 2、可以配置 SessionTypes 来达到类型提示
 */
import type { SessionTypes } from "../config/session-types"

export type SessionKeyTypes = keyof SessionTypes

const ss = sessionStorage

interface SessionAccessorTypes {
    get<T extends SessionKeyTypes>(key: T): SessionTypes[T]
    get<T extends SessionKeyTypes>(key: T[]): Pick<SessionTypes, T>
    set<T extends SessionKeyTypes>(key: T, data: SessionTypes[T]): void
    remove(key: SessionKeyTypes | SessionKeyTypes[]): void
}
const sessionAccessor: SessionAccessorTypes = {
    get(key) {
        if (typeof key === "string") {
            const value = ss.getItem(key)
            return value ? JSON.parse(value) : null
        }
        const o: Record<string, any> = {}
        key.forEach(item => {
            const value = ss.getItem(item)
            o[item] = value ? JSON.parse(value) : null
        })
        return o
    },
    set(key, data) {
        if ((data ?? "") !== "") {
            ss.setItem(key, JSON.stringify(data))
        }
    },
    remove(key) {
        if (typeof key === "string") {
            this.get(key) && ss.removeItem(key)
        } else if (Array.isArray(key)) {
            key.forEach(item => this.get(item) && ss.removeItem(item))
        }
    }
}

export default sessionAccessor
