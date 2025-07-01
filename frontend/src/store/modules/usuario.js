import api from '@/services/api'

const state = {
    user: [],
    error: null
}

const mutations = {
    SET_USER(state, user){
        state.user = user
    },
    ADD_USER(state, user){
        state.user.push(user)
    },
    SET_ERROR(state, error){
        state.error = error
    }
}

const actions = {
    async createUser({ commit }, user){
        try{
            const response = await api.post('/api/usuario', {
                login: user.login,
                senha: user.senha
            })
            commit('ADD_USER', response.data)
            return { success: true}
        }catch(error){
            console.error('Error ao cadastrar usuário: ', error)
            return {
                success: false,
                message: error.response?.data?.message || 'Error ao cadastrar usuário'
            }
        }
    }
}

const getters = {
    user: state => state.user,
    error: state => state.error
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}