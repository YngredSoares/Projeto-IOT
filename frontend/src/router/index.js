import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Aparelho from '../pages/Aparelho.vue'
import CadastrarAparelho from '../pages/CadastrarAparelho.vue'
import Login from '../pages/Login.vue'

const routes = [
    { path: '/login', name: 'Login', component: Login},
    { path: '/', name: 'Home', component: Home},
    { path: '/aparelhos', name: 'Aparelho', component: Aparelho},
    { path: '/aparelhos/cadastrar', name: 'CadastrarAparelho', component: CadastrarAparelho},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router