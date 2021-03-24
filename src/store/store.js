import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "",
    email: "",
    password: "",
  },
  mutations: {
    storeName(state, value) {
      state.name = value;
    },
    storeEmail(state, value) {
      state.email = value;
    },
    storePassword(state, value) {
      state.password = value;
    },
  },
});

