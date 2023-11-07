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