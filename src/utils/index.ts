/**
 * @description 随机字符串
 * @param len 
 * @returns 
 */
export function randomString(len = 32): string {
    const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const a = t.length
    let n = ''
    for (let i = 0; i < len; i++) {
        n += t.charAt(Math.floor(Math.random() * a))
    }
    return n
}