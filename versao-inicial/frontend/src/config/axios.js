import axios from 'axios'

// Caso o token esteja expirado o usuário será levado para a página raiz da aplicação 
const success = res => res
const error = err => {
    if(401 === err.reponse.status) {
        window.location = '/'
    } else {
        return Promise.reject(err) 
    }
}

axios.interceptors.response.use(success, error)