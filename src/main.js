import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vuelidate from "vuelidate";
import VCalendar from "v-calendar";
// import PrettyCheckbox from "pretty-checkbox-vue";

// Vue.use(PrettyCheckbox);
Vue.use(VCalendar);
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
