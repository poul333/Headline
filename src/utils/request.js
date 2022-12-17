import axios from "axios";
import store from "@/store";

const request = axios.create({
    baseURL: "http://toutiao.itheima.net/",
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        if (store.state.user?.token && config.headers) {
            // 如果有token 并且 请求头存在
            config.headers['Authorization'] = `Bearer ${store.state.user?.token}`
        }

        return config
    },
    err => Promise.reject(err)
);

export default request;
