<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">確認画面</h1>
    </header>
    <div class="form">
      <b-list-group>
        <b-list-group-item>名前:{{getName}}</b-list-group-item>
        <b-list-group-item>メールアドレス:{{get}}</b-list-group-item>
        <b-list-group-item>パスワード:表示されません</b-list-group-item>
      </b-list-group>

      <div class="btn-wrap">
        <b-button
          class="submit-btn"
          type="submit"
          variant="info"
          @click="$router.push({ name: 'Home' })"
          >登録</b-button
        >
        <b-button
          type="submit"
          variant="info"
          @click="$router.push({ name: 'Registration' })"
          >修正する</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getName() {
      return this.$store.state.name;
    },
    getEmail() {
      return this.$store.state.email;
    }
  }
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
  margin-right: 20px;
}
</style>
