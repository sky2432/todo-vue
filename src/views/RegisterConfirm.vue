<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">確認画面</h1>
    </header>
    <div class="form">
      <b-list-group>
        <b-list-group-item>名前: {{ showFormName }}</b-list-group-item>
        <b-list-group-item
          >メールアドレス: {{ showFormEmail }}</b-list-group-item
        >
        <b-list-group-item>パスワード:表示されません</b-list-group-item>
      </b-list-group>

      <div class="btn-wrap">
        <b-button
          type="submit"
          variant="info"
          @click="$router.push({ name: 'RegisterForm' })"
          >修正する</b-button
        >
        <b-button class="submit-btn" variant="info" @click="registerUser"
          >登録する</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    showFormName() {
      return this.$store.state.formName;
    },
    showFormEmail() {
      return this.$store.state.formEmail;
    },
  },
  methods: {
    async registerUser() {
      const resData = await axios.post("http://127.0.0.1:8000/api/users", {
        name: this.$store.state.formName,
        email: this.$store.state.formEmail,
        password: this.$store.state.formPassword,
      });
      console.log(resData);
      const sendData = {
        email: resData.data.data.email,
      };
      //会員登録メール送信
      axios.post("http://127.0.0.1:8000/api/sendRegisterMail", sendData);
      this.$store.commit("resetForm"); //Vuexに保存した会員登録フォーム情報をリセット
      this.$router.replace("/login");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != "RegisterForm") {
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
  padding-top: 20px;
}
.submit-btn {
  margin-left: 20px;
}
</style>
