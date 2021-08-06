import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import apollo from './plugins/apollo'
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import axios from "axios";
import VueAxios from "vue-axios";
import { Message, Notification, MessageBox } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
import acl from "./acl/acl.js";
import VueMeta from 'vue-meta'
axios.defaults.baseURL =
    "https://projects.papermindvention.com/oracle/backend/api/";
// axios.defaults.baseURL = 'http://localhost/oracle/api/'
Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
})
Vue.use(axios, VueAxios);
Vue.config.productionTip = false;
Vue.mixin({
    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace(".", ",");
            let res = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return res;
        }
    }
});
new Vue({
    router,
    store,
    vuetify,
    acl,
    // apollo,
    render: h => h(App)
}).$mount("#app");