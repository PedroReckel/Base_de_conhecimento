import 'font-awesome/css/font-awesome.css'
import Vue from 'vue' 

import App from './App'
import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO! // Para qualquer requisição que o axios fizer automaticamente terá um header chamado autorization 
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwibmFtZSI6IlBlZHJvIFJlY2tlbCBSb2JlcnRlIiwiZW1haWwiOiJwZWRyb3JlY2tlbDkwQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2ODkyOTU0NjQsImV4cCI6MTY4OTMxNzA2NH0.dH9ir54OdhozHMVwr847QaXQex_pZk4DxVeIe2k6p4c'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')