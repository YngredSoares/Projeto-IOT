<template>
    <div class="container format-container">
        <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xl-10">
            <div class="card rounded-3 text-black">
            <div class="row g-0">
                <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                    <img src="../assets/gear.svg"
                        style="width: 80px;" alt="logo">
                    </div>

                    <form @submit.prevent="handleLogin">
                    <p class = 'mt-4 mb-4 fs-6'>Faça login na sua conta</p>

                    <div class="form-floating mb-4">
                    <input type="login" class="form-control" id="login" v-model="credentials.login" required placeholder="Usuário">
                    <label for="login">Usuário</label>
                    </div>

                    <div class="form-floating mb-4">
                    <input type="password" class="form-control" id="senha"  v-model="credentials.senha" required placeholder="Senha">
                    <label for="senha">Senha</label>
                    </div>

                    <div class="text-center pt-1 mb-3 pb-1">
                        <!-- <button class="btn btn-primary form-control gradient-custom-3 mb-2" type="button">Login</button> -->
                        <button type="submit" class="btn btn-primary form-control gradient-custom-3 mb-2" :disabled="loading">
                            {{ loading ? 'Entrando ..': 'Login' }}
                        </button>
                        <a class="text-muted" href="#!">Esqueceu sua senha?</a>
                    </div>

                    <div v-if="error" class="error">
                        {{ error }}
                    </div>

                    <div class="d-flex align-items-center justify-content-center pb-4">
                        <p class="mb-0 me-2">Não tem uma conta?</p>
                        <button @click="router.push('/cadastro')" type="button" class="btn btn-outline-primary">Cadastre-se</button>
                    </div>

                    </form>

                </div>
                </div>
                <div class="col-lg-6 d-flex align-items-center gradient-custom-3 rounded">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Solução completa para controle de climatização</h4>
                    <p class="mb-0">
                    Nosso sistema permite gerenciar, monitorar e controlar 
                    aparelhos de ar-condicionado de forma prática e eficiente. 
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

const router = useRouter()
const store = useStore()

const credentials = ref({
    login: '',
    senha: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
    loading.value = true
    error.value = ''

    const result = await store.dispatch('auth/login', credentials.value)

    if (result.success) {
        router.push('/home')
    } else {
        error.value = result.message
    }

    loading.value = false
}
</script>


<style>
    .format-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gradient-custom-2 {
        background: linear-gradient(to right, #24eeae, #1ccfc9, #2881e0, #3548f2);
 
    }

    .gradient-custom-3 {
        background: linear-gradient(to right, #24eeae, #1fbfc4, #3381ff);
    }

    @media (min-width: 768px) {
        .gradient-form {
            height: 100vh !important;
        }
    }
    @media (min-width: 769px) {
        .gradient-custom-2 {
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
        }
    }

    .error{
        color: red;
        margin-top: 1rem;
        text-align: center;
    }
</style>