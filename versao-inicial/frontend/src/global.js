import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://localhost:3000'

// Cenarios comuns aonde se encontram os erros
export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

// Também dá para exportar um objeto contendo todos os elementos
// export default { baseApiUrl, showError }