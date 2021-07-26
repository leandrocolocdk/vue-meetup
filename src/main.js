import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Vuelidate from "vuelidate";
import Toasted from "vue-toasted";
import AppSocket from "./plugins/socket";
import filters from "./filters/index";
import AppDropdown from "./components/shared/AppDropdown";
import AppHero from "./components/shared/AppHero";
import AppSpinner from "./components/shared/AppSpinner";

Vue.config.productionTip = false;

Vue.component("AppHero", AppHero);
Vue.component("AppDropdown", AppDropdown);
Vue.component("AppSpinner", AppSpinner);

Vue.use(Vuelidate);
Vue.use(Toasted);
Vue.use(filters);

Vue.use(AppSocket, { connection: process.env.VUE_APP_URI });

new Vue({
  router,
  store,
  Vuelidate,
  render: h => h(App)
}).$mount("#app");
