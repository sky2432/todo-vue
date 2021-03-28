<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">
        ログインページ
      </h1>
    </header>

    <div class="form">
      <b-form @submit.prevent="auth">
        <b-form-group label="メールアドレス" label-for="email">
          <b-form-input
            id="email"
            type="email"
            v-model="$v.email.$model"
            :class="status($v.email)"
            required
          ></b-form-input>
          <p class="error" v-if="this.errors.email">
            ※メールアドレスが違います。
          </p>
        </b-form-group>
        <b-form-group label="パスワード" label-for="password">
          <b-form-input
            id="password"
            type="password"
            v-model="$v.password.$model"
            :class="status($v.password)"
            required
          ></b-form-input>
          <p class="error" v-if="this.errors.password">
            ※パスワードが違います。
          </p>
        </b-form-group>
        <div class="btn-wrap">
          <b-button type="submit" variant="info">ログイン</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios";
import store from '../store/store';
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    async auth() {
      const sendData = {
        email: this.email,
        password: this.password,
      };
      const resData = await axios.post(
        "http://127.0.0.1:8000/api/loginValidate",
        sendData
      );
      this.errors = resData.data.data;
      this.$store.dispatch("login", sendData);
    },
    status(validation) {
      return {
        dirty: validation.$dirty,
        error: validation.$error,
      };
    },
  },
  beforeRouteEnter(to, from, next) {
    if(store.state.auth){
      next('/home');
    }
    next()
  }
};
</script>

<style scoped>
.dirty {
  border-color: forestgreen;
  background: mintcream;
}
.error {
  color: red;
}
/* ------------------------------ */

header {
  height: 70px;
  background-color: #16a2b8;
}
.title {
  line-height: 70px;
  text-align: center;
  color: white;
  cursor: pointer;
}
.form {
  width: 50%;
  margin: 0 auto;
  background-color: #dbdbdb;
  margin-top: 100px;
  padding: 20px;
}
.btn-wrap {
  text-align: center;
}
</style>
