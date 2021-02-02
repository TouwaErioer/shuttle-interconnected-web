import {get, post, del} from '@/utils/request/request'

const api = '/user/'

// 登录
export const login = (params) => post(api + 'login', params)

// 注册
export const register = (params) => post(api + 'register', params)

// 重置密码
export const reset = (params) => post(api + 'resetPassword', params)

// 检查
export const check = () => get(api + 'check')

// 发送邮件
export const sendEmail = (params) => post(api + 'sendEmail', params)

// 删除用户
export const deleteUser = (params) => del(api + 'delete', params)

// 更新用户资料
export const update = (params) => post(api + 'update', params)

// 根据id查询用户
export const findUserById = (params) => get(api + 'findUserById/', params)

// 查询全部用户
export const findAll = () => get(api + 'findAll')

// 根据邮箱查询用户
export const findByEmail = (params) => get(api + 'findByEmail', params)

// 增加用户点数
export const addScore = (params) => post(api + 'addScore', params)