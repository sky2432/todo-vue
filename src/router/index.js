import Vue from "vue";
import VueRouter from "vue-router";
import multiguard from "vue-router-multiguard";
import TopPage from "../views/TopPage.vue";
import RegisterForm from "../views/RegisterFome.vue";
import RegisterConfirm from "../views/RegisterConfirm.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import TodoToday from "../views/TodoToday.vue";
import TodoDone from "../views/TodoDone.vue";
import MyPage from "../views/MyPage.vue";
import AdminHome from "../views/AdminHome.vue";
import AdminUsers from "../views/AdminUsers.vue";
import Statistics from "../views/Statistics.vue";
import Calender from "../views/Calender.vue";
import store from "../store/store";

Vue.use(VueRouter);

const loginedUser = function(to, from, next) {
  const role = store.state.loginUser.role;
  if (
    (store.state.auth && role === "user") ||
    (store.state.auth && role === "guest")
  ) {
    next("/home");
  }
  if (store.state.auth && role === "admin") {
    next("/admin/home");
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "TopPage",
    component: TopPage,
    meta: {
      title: "トップページ",
      desc: "トップページです。",
    },
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/registerForm",
    name: "RegisterForm",
    component: RegisterForm,
    meta: {
      title: "会員登録",
      desc: "会員登録ページです。",
    },
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/registerConfirm",
    name: "RegisterConfirm",
    component: RegisterConfirm,
    meta: {
      title: "会員登録確認",
      desc: "会員登録確認ページです。",
    },
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "ログイン",
      desc: "ログインページです。",
    },
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      title: "ホーム",
      desc: "ホームページです",
    },
  },
  {
    path: "/todoToday",
    name: "TodoToday",
    component: TodoToday,
    meta: {
      requiresAuth: true,
      title: "今日",
      desc: "今日のTodoページです",
    },
  },
  {
    path: "/todoDone",
    name: "TodoDone",
    component: TodoDone,
    meta: {
      title: "完了",
      desc: "完了Todoページです",
      requiresAuth: true,
    },
  },
  {
    path: "/calender",
    name: "Calender",
    component: Calender,
    meta: {
      title: "カレンダー",
      desc: "カレンダーページです",
      requiresAuth: true,
    },
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    meta: {
      title: "設定",
      desc: "設定ページです",
      requiresAuth: true,
    },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    meta: {
      title: "統計",
      desc: "統計ページです",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/home",
    name: "AdminHome",
    component: AdminHome,
    meta: {
      title: "管理者",
      desc: "管理者ページです",
      requiresAuth: true,
    },
  },
  {
    path: "/admin/users/:id",
    name: "AdminUsers",
    component: AdminUsers,
    meta: {
      title: "ユーザー詳細",
      desc: "ユーザー詳細ページです",
      requiresAuth: true,
    },
    props: true,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const role = store.state.loginUser.role;
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !store.state.auth
  ) {
    next({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
  if (role === "user" || role === "guest") {
    if (to.name === "AdminHome" || to.name === "AdminUsers") {
      next("/");
    }
  }
  if (role === "admin") {
    if (
      to.name === "Home" ||
      to.name === "TodoToday" ||
      to.name === "TodoDone" ||
      to.name === "Statistics"
    ) {
      next("/");
    }
  }
  next();
});

export default router;
