<template>
  <div id="app">
    <b-navbar type="dark" variant="info" fixed="top">
      <b-navbar-brand class="ml-3" href="#" @click="$router.push('/home')">
        <b-icon icon="card-checklist"></b-icon>
        Todolist
      </b-navbar-brand>
      <b-navbar-nav class="mr-auto">
        <b-nav-item @click="$router.push('/todoToday')">
          今日
        </b-nav-item>
        <b-nav-item @click="$router.push('/todoDone')">
          完了済み
        </b-nav-item>
        <b-nav-item @click="$router.push('/')">
          トップページ
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item
          ><b-img fluid :src="userImage" class="header-img"></b-img
        ></b-nav-item>
        <b-nav-item-dropdown right class="mr-3" :text="loginUser.name">
          <b-dropdown-item @click="$router.push('/mypage')">
            <b-icon icon="gear-fill"></b-icon>
            設定
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            <b-icon icon="door-open-fill"></b-icon>
            ログアウト
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import fileRepository from "../repositories/fileRepository";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["loginUser", "userImage"]),
  },

  created() {
    if (!this.userImage) {
      this.getUserImage();
    }
  },

  methods: {
    async getUserImage() {
      const resData = await fileRepository.getImage(this.loginUser.id);
      if (resData.data.data.file_path) {
        const userImage =
          "http://127.0.0.1:8000/storage/image/" + resData.data.data.file_path;
        this.$store.commit("storeUserImage", userImage);
      }
    },

    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.header-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
