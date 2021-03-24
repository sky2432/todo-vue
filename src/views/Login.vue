<template>
  <div id="app">
    <header>
      <h1 class="title" @click="$router.push({ name: 'TopPage' })">Login</h1>
    </header>

    <div class="form">
      <b-form>
        <b-form-group label="メールアドレス" label-for="email">
          <b-form-input
            name="email"
            id="email"
            type="email"
            placeholder="メールアドレスを入力"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="パスワード" label-for="password">
          <b-form-input
            name="password"
            id="password"
            type="password"
            placeholder="パスワードを入力"
            required
          ></b-form-input>
        </b-form-group>
        <div class="btn-wrap">
          <b-button type="submit" variant="info"
            @click="$router.push({ name: 'Home' })">ログイン</b-button
          >
        </div>
      </b-form>
    </div>

  </div>
</template>

<script>
export default {

}
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