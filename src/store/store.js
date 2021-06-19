import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";
import utilRepository from "../repositories/utilRepository";
import Repository from "../repositories/Repository";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    auth: "", //ログイン認証情報
    loginUser: "", //ログインユーザーの情報
    token: "",
    userImage: "",
    formName: "",
    formEmail: "",
    formPassword: "",
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
      state.token = "";
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
    async login({ commit }, sendData) {
      const resData = await utilRepository.login(sendData);

      if (resData.data.auth === true) {
        const token = resData.data.token;
        Repository.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

        commit("auth", resData.data.auth);
        commit("user", resData.data.data);
        commit("token", token);

        // ログインメール送信
        const sendMailData = {
          email: resData.data.data.email,
        };
        utilRepository.sendLoginMail(sendMailData);

        if (resData.data.data.role === "user" || resData.data.data.role === "guest") {
          router.replace("/home");
        }
        if (resData.data.data.role === "admin") {
          router.replace("/admin/home");
        }
      }
    },

    // ログアウト処理
    async logout({ commit }) {
      delete Repository.defaults.headers.common["Authorization"];

      const resData = await utilRepository.logout();

      commit("logout", resData.data.auth);
      router.replace("/");
    },
  },
});
