import Vue from 'vue'
import App from './App.vue'
import ParticleEffect from '@/packages/index.js'
Vue.use(ParticleEffect)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
