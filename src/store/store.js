import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from "../router/index";
import axios from "axios";

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
    },
    storeUserImage(state, payload) {
      state.userImage = payload;
    },
  },
  actions: {
    //ログイン処理
    async login({ commit }, { email, password }) {
      const responseLogin = await axios.post(
        "http://127.0.0.1:8000/api/login",
        {
          email: email,
          password: password,
        }
      )
      commit("auth", responseLogin.data.auth);
      commit("user", responseLogin.data.data);
      if (responseLogin.data.auth === true) {
        // ログインメール送信
        const sendData = {
          email: email
        };
        axios.post("http://127.0.0.1:8000/api/sendLoginMail", sendData);
        // ホーム画面へ
        router.replace("/home");
      }
    },
    // ログアウト処理
    async logout({ commit }) {
      const responseLogout = await axios.post(
        "http://127.0.0.1:8000/api/logout"
      );
      commit("logout", responseLogout.data.auth);
      router.replace("/");
    },
  },
});
