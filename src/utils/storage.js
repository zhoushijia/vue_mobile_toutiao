/*
本地存储相关操作
*/

// 存
export const setToken = (key, value) => {
  // 如果是对象或者数组格式，则经过序列化处理
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(key, value)
}

// 取
export const getToken = key => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    // 如果获取的value值不是json字符串 则直接返回  容错处理
    return value
  }
}

// 删
export const removeToken = key => {
  window.localStorage.removeItem(key)
}
