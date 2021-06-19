<template>
  <div id="app">
    <!-- ユーザーヘッダー -->
    <b-navbar
      toggleable="md"
      class="navbar"
      type="dark"
      variant="info"
      v-if="loginUser.role === 'user' || loginUser.role === 'guest'"
    >
      <b-navbar-brand class="ml-3" href="#" @click="$router.push('/Home')">
        <b-icon icon="card-checklist"></b-icon>
        TodoList
      </b-navbar-brand>

      <b-navbar-toggle target="user-sidebar">
        <template #default="{ expanded }">
          <i v-if="expanded" class="fas fa-times"></i>
          <i v-else class="fas fa-bars"></i>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
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
          <b-nav-item @click="$router.push('/calender')">
            <b-icon icon="calendar2"></b-icon>
            カレンダー
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
      </b-collapse>
    </b-navbar>

    <b-sidebar
      id="user-sidebar"
      width="250px"
      shadow
      v-if="loginUser.role === 'user' || loginUser.role === 'guest'"
    >
      <nav class="px-3 py-2">
        <b-nav vertical>
          <p class="profile">
            <b-img fluid :src="userImage" class="header-img"></b-img
            ><span class="ml-2">{{ loginUser.name }}</span>
          </p>
          <b-nav-item @click="$router.push('/home')">
            <b-icon icon="calendar3"></b-icon>
            <span class="nav-txt">全て</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/todoToday')">
            <b-icon icon="calendar-check"></b-icon>
            <span class="nav-txt">今日</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/todoDone')">
            <b-icon icon="check2-square"></b-icon>
            <span class="nav-txt">完了</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/calender')">
            <b-icon icon="calendar2"></b-icon>
            <span class="nav-txt">カレンダー</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/statistics')">
            <b-icon icon="reception4"></b-icon>
            <span class="nav-txt">統計</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/mypage')">
            <b-icon icon="gear-fill"></b-icon>
            <span class="nav-txt">設定</span>
          </b-nav-item>
          <b-nav-item @click="logout">
            <b-icon icon="door-open-fill"></b-icon>
            <span class="nav-txt">ログアウト</span>
          </b-nav-item>
        </b-nav>
      </nav>
    </b-sidebar>

    <!-- 管理者ヘッダー -->
    <b-navbar
      toggleable="md"
      class="navbar"
      type="dark"
      variant="info"
      v-if="loginUser.role === 'admin'"
    >
      <b-navbar-brand
        class="ml-3"
        href="#"
        @click="$router.push('/admin/home')"
      >
        <b-icon icon="card-checklist"></b-icon>
        TodoList
      </b-navbar-brand>

      <b-navbar-toggle target="admin-sidebar">
        <template #default="{ expanded }">
          <i v-if="expanded" class="fas fa-times"></i>
          <i v-else class="fas fa-bars"></i>
        </template>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item @click="$router.push('/admin/home')">
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
      </b-collapse>
    </b-navbar>

    <b-sidebar
      id="admin-sidebar"
      width="250px"
      shadow
      v-if="loginUser.role === 'admin'"
    >
      <nav class="px-3 py-2">
        <b-nav vertical>
          <p class="profile">
            <b-img fluid :src="userImage" class="header-img"></b-img
            ><span class="ml-2">{{ loginUser.name }}</span>
          </p>
          <b-nav-item @click="$router.push('/admin/home')">
            <b-icon icon="person-fill"></b-icon>
            <span class="nav-txt">ユーザー管理</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/statistics')">
            <b-icon icon="reception4"></b-icon>
            <span class="nav-txt">統計</span>
          </b-nav-item>
          <b-nav-item @click="$router.push('/mypage')">
            <b-icon icon="gear-fill"></b-icon>
            <span class="nav-txt">設定</span>
          </b-nav-item>
          <b-nav-item @click="logout">
            <b-icon icon="door-open-fill"></b-icon>
            <span class="nav-txt">ログアウト</span>
          </b-nav-item>
        </b-nav>
      </nav>
    </b-sidebar>
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
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
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

@media screen and (max-width: 768px) {
  .profile {
    padding-left: 16px;
  }

  .nav-txt {
    margin-left: 15px;
  }
}
</style>
