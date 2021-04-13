<template>
  <div id="app">
    <div class="container">
      <div class="wrapper">
        <h1 class="title">Todo list</h1>
        <div class="btn-wrap">
          <b-button
            variant="info"
            class="registration-btn"
            @click="$router.push({ name: 'RegisterForm' })"
            >会員登録</b-button
          >
          <b-button
            variant="info"
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
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  padding-bottom: 20px;
}

.registration-btn {
  margin-right: 20px;
}
</style>
