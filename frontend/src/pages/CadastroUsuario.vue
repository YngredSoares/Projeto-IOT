<template>
    <div class="container format-container">
        <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xl-10">
            <div class="card rounded-3 text-black">
            <div class="row g-0">
                <div class="col-lg-6 d-flex align-items-center gradient-custom-3 rounded">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 class="mb-4">Solução completa para controle de climatização</h4>
                    <p class="mb-0">
                    Nosso sistema permite gerenciar, monitorar e controlar 
                    aparelhos de ar-condicionado de forma prática e eficiente. 
                    </p>
                </div>
                </div>
                <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                    <div class="text-center">
                    <img src="../assets/gear.svg"
                        style="width: 80px;" alt="logo">
                    </div>

                    <form @submit.prevent="createUser">
                    <p class = 'mt-4 mb-4 fs-6'>Cadastre-se</p>

                    <div class="form-floating mb-4">
                        <input type="login" class="form-control" id="login" v-model="credentials.login" placeholder="Nome de usuário">
                        <label for="login">Nome de usuário</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" class="form-control" id="senha" v-model="credentials.senha" placeholder="Senha">
                        <label for="senha">Senha</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" class="form-control" id="confirmed-senha" v-model="credentials.confirmsenha" placeholder="Confirme a Senha">
                        <label for="confirmed-senha">Confirme a senha</label>
                    </div>

                    <div class="text-center mb-3">
                        <button type="submit" class="btn btn-primary form-control gradient-custom-3 mb-2">Cadastrar</button>
                    </div>

                    <div v-if="error" class="error">
                        {{ error }}
                    </div>

                    <div class="d-flex align-items-center justify-content-center">
                        <p class="mb-0 me-2">Já tem uma conta?</p>
                        <button @click="router.push('/login')" type="button" class="btn btn-outline-primary">Fazer Login</button>
                    </div>

                    </form>
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

    const store = useStore()
    const router = useRouter()

    const credentials = ref({
        login: '',
        senha: '',
        confirmsenha:''
    })

    const loading = ref(false)
    const error = ref('')

    async function createUser() {
        loading.value = true
        error.value = ''

        //Validação
        if(credentials.value.senha !== credentials.value.confirmsenha){
            error.value = 'Senha e confirmação de senha devem ser iguais.';
            loading.value = false;
            return;
        }

        const result = await store.dispatch('usuario/createUser', credentials.value)

        if (result.success) {
            router.push('/login')
        } else {
            error.value = result.message
        }

        loading.value = false
    }

</script>


<style>
    .error{
        color: red;
        margin-top: 1rem;
        text-align: center;
    }
</style>