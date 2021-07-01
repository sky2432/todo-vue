<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="wrapper">
      <div class="container mypage-container">
        <b-list-group class="col-12 col-md-4 list-group">
          <b-list-group-item button @click="currentComponent = 'MypageProfile'"
            >プロフィール</b-list-group-item
          >
          <b-list-group-item
            button
            @click="currentComponent = 'MypageUserUpdate'"
            >名前・メールアドレス</b-list-group-item
          >
          <b-list-group-item
            button
            @click="currentComponent = 'MypageUserPassword'"
            >パスワード</b-list-group-item
          >
          <b-list-group-item
            button
            @click="currentComponent = 'MypageUserDelete'"
            >アカウント削除</b-list-group-item
          >
        </b-list-group>

        <component
          class="col-12 col-md-8 mypage-component"
          :is="currentComponent"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import MypageProfile from "../components/MypageProfile";
import MypageUserUpdate from "../components/MypageUserUpdate";
import MypageUserPassword from "../components/MypageUserPassword";
import MypageUserDelete from "../components/MypageUserDelete";

export default {
  components: {
    TheHomeHeader,
    MypageProfile,
    MypageUserUpdate,
    MypageUserPassword,
    MypageUserDelete,
  },

  data() {
    return {
      currentComponent: "MypageProfile",
    };
  },
};
</script>

<style scoped>
.mypage-container {
  height: 440px;
  display: flex;
}

@media screen and (max-width: 768px) {
  .wrapper {
    display: block;
  }

  .mypage-container {
    height: auto;
    flex-direction: column;
    justify-content: center;
    margin-top: 8px;
  }

  .list-group {
    margin-bottom: 20px;
    padding: 0px;
  }

  .mypage-component {
    padding: 0px;
  }
}
</style>
