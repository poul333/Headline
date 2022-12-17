import request from "@/utils/request";
import store from "@/store";

export const sendCode = mobile => request.get(`/v1_0/sms/codes/${mobile}`)

// login
export const login = data => request.post('/v1_0/authorizations', data)

// 获取用户信息
export const getUserBaseInfo = () => request.get('/v1_0/user',)