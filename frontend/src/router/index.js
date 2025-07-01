import { createRouter, createWebHistory } from 'vue-router'

import store from '../store/modules/auth'
import Home from '../pages/Home.vue'
import Aparelho from '../pages/Aparelho.vue'
import CadastrarAparelho from '../pages/CadastrarAparelho.vue'
import Login from '../pages/Login.vue'
import CadastroUsuario from '../pages/CadastroUsuario.vue'

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true }},
    { path: '/login', name: 'Login', component: Login, meta: { guest: true }},
    { path: '/cadastro', name: 'CadastroUsuario', component: CadastroUsuario, meta: { guest: true }},
    { path: '/aparelhos', name: 'Aparelho', component: Aparelho, meta: { requiresAuth: true }},
    { path: '/aparelhos/cadastrar', name: 'CadastrarAparelho', component: CadastrarAparelho, meta: { requiresAuth: true }},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'] || !!localStorage.getItem('token');
  console.log("Auth status:", isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  }
  else if (to.meta.guest && isAuthenticated) {
    next('/home')
  }
  else {
    next()
  }
})

export default router