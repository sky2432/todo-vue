import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VCalendar from "v-calendar";
import helpers from "./helpers/utile";
import Repository from "./repositories/Repository";

const token = store.state.token;
if (token) {
  Repository.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const plugin = {
  install() {
    Vue.prototype.$helpers = helpers;
  },
};

Vue.use(plugin);

Vue.use(VCalendar);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
