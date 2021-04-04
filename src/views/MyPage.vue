<template>
  <div id="app">
    <TheHomeHeader></TheHomeHeader>
    <div class="row justify-content-center container">
      <b-list-group class="col-4">
        <b-list-group-item button @click="currentComponent = 'MypageProfile'"
          >プロフィール</b-list-group-item
        >
        <b-list-group-item button @click="currentComponent = 'MypageUserUpdate'"
          >各種変更</b-list-group-item
        >
        <b-list-group-item button @click="currentComponent = 'MypageUserDelete'"
          >アカウント削除</b-list-group-item
        >
      </b-list-group>

      <component class="col-8" :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import TheHomeHeader from "../components/TheHomeHeader";
import MypageProfile from "../components/MypageProfile";
import MypageUserUpdate from "../components/MypageUserUpdate";
import MypageUserDelete from "../components/MypageUserDelete";
export default {
  components: {
    TheHomeHeader,
    MypageProfile,
    MypageUserUpdate,
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
.container {
  width: 80%;
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
}
</style>
