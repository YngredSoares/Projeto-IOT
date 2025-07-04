import api from '@/services/api'

const state = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token')
}

const mutations = {
    SET_TOKEN(state, token){
        state.token=token
        state.isAuthenticated=!!token
        localStorage.setItem('token', token)
    },
    CLEAR_TOKEN(state){
        state.token=null
        state.isAuthenticated=false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
    SET_USER(state,user){
        state.user=user
        localStorage.setItem('user', JSON.stringify(user))
    }
}

const actions = {
    async login({ commit }, credentials){
        try{
            const response = await api.post('/api/auth', {
                login: credentials.login,
                senha: credentials.senha
            })

            const token = response.data.token

            commit('SET_TOKEN', token)
            commit('SET_USER', credentials.login)

            return { success: true}
        } catch(error) {
            console.error('Error no login: ', error)
            return {
                success:false,
                message: error.response?.data?.message || 'Usuário ou senha inválidas.'
            }
        }
    },
    logout({commit}){
        commit('CLEAR_TOKEN')
        commit('SET_USER', null)
    }
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    token: state => state.token
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}