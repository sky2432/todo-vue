<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title" @click="$router.push('/')">
        会員登録ページ
      </h1>
    </header>
    <div class="wrapper">
      <div class="container">
        <b-form @submit.prevent="formValidate" novalidate>
          <b-form-group label="名前" label-for="name">
            <b-form-input
              id="name"
              :value="formName"
              @input="storeFormName"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsName">
              <p class="error-message" v-for="(error, index) in this.errorsName" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group label="メールアドレス" label-for="email">
            <b-form-input
              id="email"
              type="email"
              :value="formEmail"
              @input="storeFormEmail"
              required
            ></b-form-input>
            <div class="error" v-if="this.errorsEmail">
              <p class="error-message" v-for="(error, index) in this.errorsEmail" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <b-form-group
            label="パスワード"
            label-for="password"
            class="password-form"
          >
            <b-form-input
              id="password"
              :value="formPassword"
              @input="storeFormPassword"
              :type="inputType"
            >
            </b-form-input>
            <b-icon
              :icon="iconType"
              class="eye-icon"
              @click="changeEyeChecked"
            ></b-icon>

            <div class="error" v-if="this.errorsPassword">
              <p class="error-message" v-for="(error, index) in this.errorsPassword" :key="index">
                {{ error }}
              </p>
            </div>
          </b-form-group>
          <div class="btn-wrap">
            <b-button variant="outline-info" type="submit">確認</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import usersRepository from "../repositories/usersRepository";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      eyeChecked: false,
      errorsName: [],
      errorsEmail: [],
      errorsPassword: [],
    };
  },

  computed: {
    ...mapState(["formName", "formEmail", "formPassword"]),

    inputType() {
      return this.eyeChecked ? "text" : "password";
    },

    iconType() {
      return this.eyeChecked ? "eye-slash" : "eye";
    },
  },

  methods: {
    ...mapMutations(["storeFormName", "storeFormEmail", "storeFormPassword"]),

    formValidate() {
      const sendData = {
        name: this.formName,
        email: this.formEmail,
        password: this.formPassword,
      };
      usersRepository
        .registerConfirm(sendData)
        .then(() => this.$router.push("/registerConfirm"))
        .catch((e) => {
          this.errorsName = e.response.data.errors.name;
          this.errorsEmail = e.response.data.errors.email;
          this.errorsPassword = e.response.data.errors.password;
          console.log(this.errorsName);
        });
    },
    changeEyeChecked() {
      this.eyeChecked = !this.eyeChecked;
    },
  },

  beforeRouteLeave(to, from, next) {
    if (to.name != "RegisterConfirm") {
      this.$store.commit("resetForm");
      next();
    } else {
      next();
    }
  },
};
</script>

<style scoped>
.btn-wrap {
  text-align: center;
}
</style>
