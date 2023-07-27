import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'
import { baseApiUrl, userKey } from '@/global'
import axios from 'axios'


Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages,
        meta: { requiresAdmin: true }
    }, {
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    }, {
        name: 'articleById',
        path: '/articles/:id',
        component: ArticleById
    }, {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// Esse evento vai ser chamado sempre que for navegado de uma rota para a outra 
// Impedir que um usuário vá para uma tela que ele não tenha direito
router.beforeEach(async (to, from, next) => {
    const json = localStorage.getItem(userKey)
    
    // Validar se a URL que o usuário está sendo direcionado é apenas para admin
    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        const admin = await axios.post(`${baseApiUrl}/validateAdmin`, user) // Indo no backend validar se o usuário é admin

        user && admin.data ? next() : next({ path: '/' }) // Se for o usuário for admin será levado para a proxima pagina, se não irá voltar para a tela raiz da aplicação
    } else {
        next()
    }
}) 

export default router