import Vue from 'vue'
import VueRouter from 'vue-router'
import TopPage from '../views/TopPage.vue'
import Registration from "../views/Registration.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import RegistrationConfirm from "../views/RegistrationConfirm.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "TopPage",
    component: TopPage,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/registration/confirm",
    name: "RegistrationConfirm",
    component: RegistrationConfirm,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
