import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "@/router";
import store from "../store/";
import axios from "axios";
Vue.use(AclInstaller);
if (store.state.authentication) {
    axios.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${store.state.authentication}`;
}
let initialRole = "public";
const userInfo = store.state.user; //JSON.parse(localStorage.getItem('userInfo'))
if (store.state.user.role) {
    initialRole = store.state.user.role;
} else if (userInfo && userInfo.id) {
    initialRole = userInfo.role;
}

export default new AclCreate({
    initial: initialRole,
    notfound: "/",
    router,
    acceptLocalRules: true,
    globalRules: {
        Admin: new AclRule("Admin").generate(),
        Member: new AclRule("Member").or("Admin").generate(),
        public: new AclRule("public")
            .or("Admin")
            .or("Member")
            .generate()
    },
    middleware: async acl => {
        // store.watch(
        //     (state, getters) => state.user,
        //     (newValue, oldValue) => {
        //         console.log(`Updating from ${oldValue.role} to ${newValue.role}`);
        //         newValue.role ? acl.change(newValue.role) : acl.change("public");
        //     }
        // );
        axios
            .get("user")
            .then(res => {
                console.log(res.data.role);
                acl.change(res.data.role);
            })
            .catch(err => {
                acl.change("public");
            });
    }
});