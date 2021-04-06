<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push('/')">
        パスワードリセット
      </h1>
    </header>

    <div class="form">
      <b-form @submit.prevent="login" novalidate>
        <b-form-group label="メールアドレス" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="アカウントのメールアドレスを入力してください"
            v-model="email"
            required
          ></b-form-input>
         
        <div class="btn-wrap">
          <b-button type="submit" variant="info">送信</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import utilRepository from "../repositories/utilRepository";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorsEmail: [],
      errorsPassword: [],
    };
  },

  methods: {
    
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
