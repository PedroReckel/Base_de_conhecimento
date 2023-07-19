import 'font-awesome/css/font-awesome.css'
import Vue from 'vue' 

import App from './App'
import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO! // Para qualquer requisição que o axios fizer automaticamente terá um header chamado autorization 
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IlBlZHJvIFJlY2tlbCBSb2JlcnRlIiwiZW1haWwiOiJwZWRyb3JlY2tlbDkwQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODk3ODMxODcsImV4cCI6MTY4OTgwNDc4N30.fUhhxRPmKsj7nA_A4ZZEw974dC4r7wZGpfu0spPoys0'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')