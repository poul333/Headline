// 封装数据持久化 自动序列化和反序列化

// #region
// function getItem(key) {
//     const value = localStorage.getItem(key)

//     try {
//         return JSON.parse(value)
//     } catch (error) {
//         return value
//     }
// }

// function setItem(key, value) {
//     return localStorage.setItem(key, JSON.stringify(value))
// }

// function removeItem(key) {
//     localStorage.removeItem(key)
// }
// #endregion

export const getItem = key => {
    const value = localStorage.getItem(key)

    try {
        return JSON.parse(value)
    } catch (error) {
        return value
    }
}

export const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const removeItem = key => localStorage.removeItem(key)

