import Vue from "vue";
import VueRouter from "vue-router";
import TopPage from "../views/TopPage.vue";
import RegisterForm from "../views/RegisterFome.vue";
import RegisterConfirm from "../views/RegisterConfirm.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import DoneTodo from "../views/DoneTodo.vue";
import MyPage from "../views/MyPage.vue";
import RequestPasswordReset from "../views/RequestPasswordReset.vue";
import store from "../store/store";


Vue.use(VueRouter);

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
    beforeEnter(to, from, next) {
      if (store.state.auth) {
        next("/home");
      }
      next();
    },
  },
  {
    path: "/registerConfirm",
    name: "RegisterConfirm",
    component: RegisterConfirm,
    beforeEnter(to, from, next) {
      if (store.state.auth) {
        next("/home");
      }
      next();
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.state.auth) {
        next("/home");
      }
      next();
    },
  },
  {
    path: "/requestPasswordReset",
    name: "RequestPasswordReset",
    component: RequestPasswordReset,
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
    path: "/doneTodo",
    name: "DoneTodo",
    component: DoneTodo,
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
  } else {
    next();
  }
});

export default router;
