<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">会員登録</h1>
    </header>
    <div class="form">
      <b-form>
        <b-form-group label="名前" label-for="name">
          <b-form-input
            name="name"
            id="name"
            v-model="storeName"
            :value="storeName"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="メールアドレス" label-for="email">
          <b-form-input
            name="email"
            id="email"
            type="email"
            v-model="storeEmail"
            :value="storeEmail"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="パスワード" label-for="password">
          <b-form-input
            name="password"
            id="password"
            v-model="storePassword"
            :value="storePassword"
            required
          ></b-form-input>
        </b-form-group>
        <div class="btn-wrap">
          <b-button
            type="submit"
            variant="info"
            @click="$router.push({ name: 'RegistrationConfirm' })"
            >登録</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    storeName: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("storeName", value);
      },
    },
    storeEmail: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("storeEmail", value);
      },
    },
    storePassword: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit("storePassword", value);
      },
    },
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
