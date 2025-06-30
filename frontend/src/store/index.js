import { createStore } from 'vuex'
import auth from './modules/auth'
import usuario from './modules/usuario'

export default createStore({
    modules:{
        auth,
        usuario
    }
})