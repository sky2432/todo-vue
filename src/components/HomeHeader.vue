<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="ml-3" href="#" @click="$router.push('/home')">
        <b-icon icon="card-checklist"></b-icon>
        Todolist
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="mr-3" @click="$router.push('/doneTodo')"
            >完了済みTodo</b-nav-item
          >
          <b-nav-item
            ><b-img
              fluid
              src="https://picsum.photos/250/250/?image=54"
              rounded="circle"
              v-bind="mainProps"
            ></b-img
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
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainProps: {  width: 30, height: 30, class: 'm1' }
    };
  },
  computed: {
    showUserName() {
      return this.$store.state.name.name;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped></style>
