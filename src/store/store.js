import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";
import utilRepository from "../repositories/utilRepository";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    auth: "", //ログイン認証情報
    loginUser: "", //ログインユーザーの情報
    formName: "",
    formEmail: "",
    formPassword: "",
    userImage: "",
  },

  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user(state, payload) {
      state.loginUser = payload;
    },
    updateUser(state, payload) {
      state.loginUser = payload;
    },
    logout(state, payload) {
      state.auth = payload;
      state.loginUser = "";
      state.userImage = "";
    },
    storeFormName(state, payload) {
      state.formName = payload;
    },
    storeFormEmail(state, payload) {
      state.formEmail = payload;
    },
    storeFormPassword(state, payload) {
      state.formPassword = payload;
    },
    resetForm(state) {
      state.formName = "";
      state.formEmail = "";
      state.formPassword = "";
    },
    storeUserImage(state, payload) {
      state.userImage = payload;
    },
  },

  actions: {
    //ログイン処理
    async login({ commit }, { email, password }) {
      const sendLoginData = {
        email: email,
        password: password,
      };
      const redData = await utilRepository.login(sendLoginData);

      commit("auth", redData.data.auth);
      commit("user", redData.data.data);

      if (redData.data.auth === true) {
        // ログインメール送信
        const sendMailData = {
          email: email,
        };
        utilRepository.sendLoginMail(sendMailData);

        router.replace("/home");
      }
    },
    // ログアウト処理
    async logout({ commit }) {
      const resData = await utilRepository.logout();

      commit("logout", resData.data.auth);
      router.replace("/");
    },
  },
});
