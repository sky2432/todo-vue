<template>
  <div id="app">
    <div class="wrapper">
      <div class="wrap">
        <h1 class="title">TodoList</h1>
        <div class="btn-wrap">
          <b-button
            variant="outline-info"
            class="registration-btn"
            @click="$router.push({ name: 'RegisterForm' })"
            >会員登録</b-button
          >
          <b-button
            variant="outline-info"
            class="login-btn"
            @click="$router.push({ name: 'Login' })"
            >ログイン</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: calc(var(--vh) * 100);
}

.wrap {
  text-align: center;
}

.title {
  padding-bottom: 20px;
}

.registration-btn {
  margin-right: 20px;
}
</style>
