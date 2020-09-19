import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import category from './modules/category'
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {customer,product,category}
})
