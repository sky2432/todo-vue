<template>
  <div id="app">
    <b-navbar type="dark" variant="info" fixed="top">
      <b-navbar-brand class="ml-3" href="#" @click="$router.push('/home')">
        <b-icon icon="card-checklist"></b-icon>
        Todolist
      </b-navbar-brand>
      <b-navbar-nav class="mr-auto">
        <b-nav-item @click="$router.push('/doneTodo')" class="mr-3">
          完了済みTodo
        </b-nav-item>
      </b-navbar-nav>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- <b-collapse id="nav-collapse" is-nav> -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          ><b-img fluid :src="displayUserImage" class="header-img"></b-img
        ></b-nav-item>
        <b-nav-item-dropdown right class="mr-3" :text="showUserName">
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
      <!-- </b-collapse> -->
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  computed: {
    showUserName() {
      return this.$store.state.loginUser.name;
    },
    displayUserImage() {
      return this.$store.state.userImage;
    },
  },
  methods: {
    async getUserImage() {
      const userId = this.$store.state.loginUser.id;
      const resData = await axios.get(
        "http://127.0.0.1:8000/api/files/" + userId
      );
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
  created() {
    if (!this.userImage) {
      this.getUserImage();
    }
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
