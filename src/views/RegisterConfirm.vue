<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push('/')">確認画面</h1>
    </header>
    <div class="form">
      <b-list-group>
        <b-list-group-item>名前: {{ formName }}</b-list-group-item>
        <b-list-group-item
          >メールアドレス: {{ formEmail }}</b-list-group-item
        >
        <b-list-group-item>パスワード:表示されません</b-list-group-item>
      </b-list-group>

      <div class="btn-wrap">
        <b-button
          type="submit"
          variant="info"
          @click="$router.push('/registerForm')"
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
import usersRepository from "../repositories/usersRepository";
import utilRepository from "../repositories/utilRepository";
import { mapState, mapMutations } from "vuex";


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
    ...mapState(["formName", "formEmail", "formPassword"]),
  },
  
  methods: {
    ...mapMutations(["resetForm"]),

    async registerUser() {
      const userSendData = {
        name: this.formName,
        email: this.formEmail,
        password: this.formPassword,
      };
      const resData = await usersRepository.createUser(userSendData);

      //会員登録メール送信
      const sendData = {
        email: resData.data.data.email,
      };
      utilRepository.sendRegisterMail(sendData)

      this.resetForm;
      this.$router.replace("/login");
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != "RegisterForm") {
      this.resetForm;
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
