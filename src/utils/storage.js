// 持久化存储信息
const INFO_KEY = 'shopping_info'
// 获取个人信息
export const getInfo = () => {
  // 序列化存储到本地
  const result = localStorage.getItem(INFO_KEY)
  // 如果result为空， 那么就创建一个
  return result ? JSON.parse(result) : {
    token: '',
    userId: ''
  }
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 持久化搜索历史
// 设置持久化的关键字
const HISTORY_KEY = "history_list"
// 获取搜索历史
export const getHistoryList = ()=> {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : [] // 如果没有就传一个空数组
}

// 设置(移除)搜索历史
export const setHistoryList = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}