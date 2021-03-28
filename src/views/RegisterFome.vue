<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">
        会員登録ページ
      </h1>
    </header>
    <div class="form">
      <b-form @submit.prevent="formValidate">
        <b-form-group label="名前" label-for="name">
          <!-- <pre>{{ $v.name }}</pre> -->
          <b-form-input
            id="name"
            :value="showFormName"
            @input="storeFormName"
            required
          ></b-form-input>
          <p class="error" v-if="this.errors.name">
            ※入力された名前はすでに登録されています。
          </p>
          
        </b-form-group>
        <b-form-group label="メールアドレス" label-for="email">
          <b-form-input
            id="email"
            type="email"
            :value="showFormEmail"
            @input="storeFormEmail"
            required
          ></b-form-input>
          <p class="error" v-if="this.errors.email">
            ※入力されたメールアドレスはすでに登録されています。
          </p>
        </b-form-group>
        <b-form-group label="パスワード" label-for="password">
          <b-form-input
            id="password"
            :value="showFormPassword"
            @input="storeFormPassword"
            required
          ></b-form-input>
          <p class="error" v-if="this.errors.password">
            ※パスワードは4文字以上です。
          </p>
        </b-form-group>
        <div class="btn-wrap">
          <b-button variant="info" type="submit">確認</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
// import { required, minLength, between } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: "",
    };
  },
  // validations: {
  //   name: {
  //     required,
  //     minLength: minLength(3),
  //   },
  //   password: {
  //     required,
  //     minLength: minLength(3),
  //   },
  // },
  computed: {
    showFormName() {
      return this.$store.state.formName;
    },
    showFormEmail() {
      return this.$store.state.formEmail;
    },
    showFormPassword() {
      return this.$store.state.formPassword;
    },
  },
  methods: {
    storeFormName(value) {
      this.$store.commit("storeFormName", value);
    },
    storeFormEmail(value) {
      this.$store.commit("storeFormEmail", value);
    },
    storeFormPassword(value) {
      this.$store.commit("storeFormPassword", value);
    },
    async formValidate() {
      const sendData = {
        name: this.$store.state.formName,
        email: this.$store.state.formEmail,
        password: this.$store.state.formPassword,
      };
      const resData = await axios.post(
        "http://127.0.0.1:8000/api/formValidate",
        sendData
      );
      this.errors = resData.data.data;
      console.log(resData);
      if (this.errors.length === 0) {
        this.$router.push({
          name: "RegisterConfirm",
          });
      }
    },
  },
  // status(validation) {
  //   return {
  //     dirty: validation.$dirty,
  //     error: validation.$error,
  //   };
  // },

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
.error {
  color: rgb(255, 83, 83);
}
/* form-validation */
/* .dirty {
  border-color: forestgreen;
  background: mintcream;
}
.success-msg {
  color: forestgreen;
}
.error {
  border-color: red;
  background: mistyrose;
}
.error-msg {
  color: red;
} */
/* ------------------------------ */
</style>
