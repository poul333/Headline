import request from "@/utils/request";

export const sendCode = async (mobile) => {
  const res =  await request.get(`/v1_0/sms/codes/${mobile}`)
  console.log(res);
}