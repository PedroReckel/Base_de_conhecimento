import 'font-awesome/css/font-awesome.css'
import Vue from 'vue' 

import App from './App'
import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO! // Para qualquer requisição que o axios fizer automaticamente terá um header chamado autorization 
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IlBlZHJvIFJlY2tlbCBSb2JlcnRlIiwiZW1haWwiOiJwZWRyb3JlY2tlbDkwQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODk4Nzc1MDgsImV4cCI6MTY4OTg5OTEwOH0.XXj8Z49V6TkyskspnVltQ_qw-jF1D0Sv7DC6s2G9wc8'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')