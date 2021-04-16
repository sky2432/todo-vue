<template>
  <div id="app">
    <b-navbar class="navbar" type="dark" variant="info">
      <b-navbar-brand
        class="ml-3"
        href="#"
        @click="$router.push('/Home')"
        v-if="loginUser.role === 'user'"
      >
        <b-icon icon="card-checklist"></b-icon>
        Todolist
      </b-navbar-brand>

      <b-navbar-nav class="mr-auto" v-if="loginUser.role === 'user'">
        <b-nav-item @click="$router.push('/home')">
          <b-icon icon="calendar3"></b-icon>
          全て
          <span class="vertical-bar">|</span>
        </b-nav-item>
        <b-nav-item @click="$router.push('/todoToday')">
          <b-icon icon="calendar-check"></b-icon>
          今日<span class="vertical-bar">|</span>
        </b-nav-item>
        <b-nav-item @click="$router.push('/todoDone')">
          <b-icon icon="check2-square"></b-icon>
          完了<span class="vertical-bar">|</span>
        </b-nav-item>
        <b-nav-item @click="$router.push('/')">
          トップページ
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-brand
        class="ml-3"
        href="#"
        @click="$router.push('/adminHome')"
        v-if="loginUser.role === 'admin'"
      >
        <b-icon icon="card-checklist"></b-icon>
        Todolist
      </b-navbar-brand>

      <b-navbar-nav class="mr-auto" v-if="loginUser.role === 'admin'">
        <b-nav-item @click="$router.push('/adminHome')">
          ユーザー管理<span class="vertical-bar">|</span>
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
          <b-dropdown-item @click="$router.push('/statistics')">
            <b-icon icon="reception4"></b-icon>
            統計
          </b-dropdown-item>
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
.navbar {
  height: 70px;
}
.header-img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
}
.vertical-bar {
  margin-left: 10px;
}
</style>
