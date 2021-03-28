import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    name: "",
    formName: "",
    formEmail: "",
    formPassword: "",
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    member(state, payload) {
      state.name = payload;
    },
    logout(state, payload) {
      state.auth = payload;
      state.name = "";
    },
    storeFormName(state, value) {
      state.formName = value;
    },
    storeFormEmail(state, value) {
      state.formEmail = value;
    },
    storeFormPassword(state, value) {
      state.formPassword = value;
    },
    resetForm(state) {
      state.formName = "";
      state.formEmail = "";
      state.formPassword = "";
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        }
      );

      commit("auth", responseLogin.data.auth);
      commit("member", responseLogin.data.data);
      if (responseLogin.data.auth === true) {
        router.replace("/home");
      }
    },
    async logout({ commit }) {
      const responseLogout = await axios.post(
        "http://127.0.0.1:8000/api/logout"
      );
      commit("logout", responseLogout.data.auth);
      router.replace("/");
    },
  },
});
