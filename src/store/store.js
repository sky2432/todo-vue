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
    token: "",
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
    token(state, payload) {
      state.token = payload;
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
      const resData = await utilRepository.login(sendLoginData);
      const token = resData.data.data.api_token;

      if (resData.data.auth === true) {
        commit("auth", resData.data.auth);
        commit("user", resData.data.data);
        commit("token", token);

        // ログインメール送信
        const sendMailData = {
          email: email,
        };
        utilRepository.sendLoginMail(sendMailData);

        if (resData.data.data.role === "user") {
          router.replace("/home");
        }
        if (resData.data.data.role === "admin") {
          router.replace("/admin/home");
        }
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
