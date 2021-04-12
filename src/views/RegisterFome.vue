<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push('/')">
        会員登録ページ
      </h1>
    </header>
    <div class="form">
      <b-form @submit.prevent="formValidate" novalidate>
        <b-form-group label="名前" label-for="name">
          <b-form-input
            id="name"
            :value="formName"
            @input="storeFormName"
            required
          ></b-form-input>
          <div class="error" v-if="this.errorsName">
            <p v-for="(error, index) in this.errorsName" :key="index">
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
            <p v-for="(error, index) in this.errorsEmail" :key="index">
              {{ error }}
            </p>
          </div>
        </b-form-group>
        <b-form-group label="パスワード" label-for="password">
          <b-form-input
            id="password"
            :value="formPassword"
            @input="storeFormPassword"
            required
          ></b-form-input>
          <div class="error" v-if="this.errorsPassword">
            <p v-for="(error, index) in this.errorsPassword" :key="index">
              {{ error }}
            </p>
          </div>
        </b-form-group>
        <div class="btn-wrap">
          <b-button variant="info" type="submit">確認</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import utilRepository from "../repositories/utilRepository";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorsName: [],
      errorsEmail: [],
      errorsPassword: [],
    };
  },

  computed: {
    ...mapState(["formName", "formEmail", "formPassword"]),
  },

  methods: {
    ...mapMutations(["storeFormName", "storeFormEmail", "storeFormPassword"]),

    formValidate() {
      const sendData = {
        name: this.formName,
        email: this.formEmail,
        password: this.formPassword,
      };
      utilRepository
        .registerConfirm(sendData)
        .then((response) => this.$router.push("/registerConfirm"))
        .catch((e) => {
          console.log(e);
          this.errorsName = e.response.data.errors.name;
          this.errorsEmail = e.response.data.errors.email;
          this.errorsPassword = e.response.data.errors.password;
        });
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
