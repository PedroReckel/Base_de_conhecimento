// Dentro do Store eu vou criar uma area de armazenamento aonde eu vou consegui compartilhar entre
// os componentes sem que um componente tenha que mexer em outro diretamente

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'mock@seiinteligencia.com.br'
        }
    },
    mutations: { // A mutation vai servir para alternancia do estado do menu (Se eu não passar nenhum dado ele já vai fazer a alternancia altomaticamente)
        toggleMenu(state, isVisible) {
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            console.log('toggleMenu = ' + state.isMenuVisible)
        }        
    }
})