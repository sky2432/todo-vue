import Vue from "vue";
import VueRouter from "vue-router";
import RequestPasswordReset from "../views/RequestPasswordReset.vue";
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
import store from "../store/store";

Vue.use(VueRouter);

const loginedUser = function(to, from, next) {
  if (store.state.auth && store.state.loginUser.role === "user") {
    next("/home");
  }
  if (store.state.auth && store.state.loginUser.role === "admin") {
    next("/adminHome");
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "TopPage",
    component: TopPage,
  },
  {
    path: "/registerForm",
    name: "RegisterForm",
    component: RegisterForm,
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/registerConfirm",
    name: "RegisterConfirm",
    component: RegisterConfirm,
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/requestPasswordReset",
    name: "RequestPasswordReset",
    component: RequestPasswordReset,
    beforeEnter: multiguard([loginedUser]),
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/todoToday",
    name: "TodoToday",
    component: TodoToday,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/todoDone",
    name: "TodoDone",
    component: TodoDone,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/adminHome",
    name: "AdminHome",
    component: AdminHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/adminUsers/:id",
    name: "AdminUsers",
    component: AdminUsers,
    meta: {
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
  if (store.state.loginUser.role === "user") {
    if (to.name === "AdminHome" || to.name === "AdminUsers") {
      next("/");
    }
  }
  if (store.state.loginUser.role === "admin") {
    if (
      to.name === "Home" ||
      to.name === "TodoToday" ||
      to.name === "TodoDone"
    ) {
      next("/");
    }
  }
  next();
});

export default router;
