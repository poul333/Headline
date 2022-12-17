import * as storage from '@/utils/storage'
export default {
    namespaced: true,
    state: {
        // token: JSON.parse(localStorage.getItem('token'))?.token
        token: storage.getItem('token')?.token
    },
    actions: {

    },
    mutations: {
        changeToken(state, token) {
            if (token) {
                state.token = token.token
                // localStorage.setItem('token', JSON.stringify(token))  //本地存储tokenx
                storage.setItem('token', token)
            }else{
                state.token = null
                storage.removeItem('token')
            }
        }
    }
}