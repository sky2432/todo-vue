<template>
  <div id="full-page">
    <router-view />
  </div>
</template>

<script>
import windowWidthHeightMixin from "./mixins/windowWidthHeightMixin.js";

export default {
  mixins: [windowWidthHeightMixin],

  watch: {
    $route(routeInstance) {
      this.createTitleDesc(routeInstance);
    },

    //windowWidthHeightMixinの変数
    width() {
      this.setProperty();
    },
    //windowWidthHeightMixinの変数
    height() {
      this.setProperty();
    },
  },

  created() {
    this.setProperty();
  },

  mounted() {
    var routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
  },

  methods: {
    setProperty() {
      let height = window.innerHeight;
      document.documentElement.style.setProperty("--vh", height / 100 + "px");
    },

    createTitleDesc: function(routeInstance) {
      if (routeInstance.meta.title) {
        var setTitle = routeInstance.meta.title + " | TodoList";
        document.title = setTitle;
      } else {
        document.title = "TodoList";
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}

ul {
  padding: 0;
}

.error {
  color: red;
  margin-bottom: 0;
}

.error-message {
  margin-bottom: 0px;
}

html,
body {
  background-color: #f5f9fc;
}

#full-page {
  background-color: #f5f9fc;
}

.wrapper {
  height: calc(var(--vh) * 100 - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  padding: 20px;
  background: hsl(0 0% 100%);
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
}

/* ヘッダー */
.header {
  height: 70px;
  background-color: #16a2b8;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.header-title {
  line-height: 70px;
  text-align: center;
  color: white;
  cursor: pointer;
}

/* マイページ */
.mypage-content {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 100%;
}

.password-form {
  position: relative;
}

.eye-icon {
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 10px;
}

/* todo表示関連 */
.display-today {
  padding-left: 10px;
  color: rgb(133, 133, 133);
}

.add-btn-wrap {
  text-align: center;
}

.line {
  border-color: #16a2b8;
}

.todo-line {
  display: flex;
}

.todo-line:hover {
  border-radius: 5px;
  background-color: #daf0f3;
}

.check-wrap {
  padding: 15px 0 15px 10px;
}

.todo-content-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 15px 0;
}

.todo-txt-wrap {
  display: flex;
}

.todo-icon-date-wrap {
  display: flex;
}

.todo-icon {
  cursor: pointer;
  color: #16a2b8;
}

.todo-date {
  width: 50px;
  margin-bottom: 0px;
}

/* todo登録・編集モーダルウィンドウ */
.input-btn-wrap {
  display: flex;
  justify-content: space-between;
}

.calendar-btn-wrap {
  width: 28%;
}

.calendar-btn {
  width: 100%;
}

@media screen and (max-width: 576px) {
  .input-btn-wrap {
    flex-direction: column;
  }

  .calendar-btn-wrap {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }

  .calendar-btn {
    width: 50%;
  }
}

/* その他 */
.spinner-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
