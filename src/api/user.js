import request from "@/utils/request";

export const sendCode = (mobile) => request.get(`/v1_0/sms/codes/${mobile}`)

// login
export const login = data => request.post('/v1_0/authorizations', data)

