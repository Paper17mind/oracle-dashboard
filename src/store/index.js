import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import secureLS from "secure-ls";
// import acl from './../acl/acl'
import route from "../router/index";
import { stat } from "fs";
import axios from "axios";
import { nextTick } from "process";
var ls = new secureLS({
    encodingType: "aes",
    encryptionSecret: "^77asj12@skdjasdk"
});

Vue.use(Vuex);

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default new Vuex.Store({
    state: {
        authentication: {},
        Authorization: false,
        user: {},
        role: "public",
        isLogout: false,
        code: 401,
        search: null,
        phone: null,
        category: null,
        navigasi: false,
        cart: [],
        order: [],
        pendingID: null,
        account_g: {},
        role: null,
        invoice: {},
        stores: {}
    },
    mutations: {
        authentication(state, val) {
            state.authentication = val;
        },
        phone(state, value) {
            state.phone = value;
        },
        Authorization(state, value) {
            state.Authorization = value;
        },
        logout(state, value) {
            state.logout = value;
        },
        user(state, val) {
            state.user = val;
        },
        account_g(state, value) {
            state.account_g = value;
        },
        role(state, value) {
            state.role = value;
        },
        search(state, value) {
            state.search = value;
        },
        category(state, value) {
            state.category = value;
        },
        cart(state, value) {
            state.cart = value;
        },
        order(state, value) {
            state.order = value;
        },
        pendingID(state, value) {
            state.pendingID = value;
        },
        code(state, value) {
            state.code = value;
        },
        invoice(state, value) {
            state.invoice = value;
        },
        navigasi(state, value) {
            state.navigasi = value;
        },
        stores(state, value) {
            state.stores = value;
        }
    },
    actions: {
        async invoice({ commit }, data) {
            commit("invoice", data);
        },
        async navigasi({ commit }) {
            window.innerWidth > 450 ?
                commit("navigasi", true) :
                commit("navigasi", false);
        },
        async cart({ commit }, cart) {
            commit("cart", cart);
        },
        async login({ commit }, users) {
            const res = await axios.post("/auth/login", users).catch(error => {
                alert(error);
                console.log(error);
                commit("code", error);
            });

            axios.defaults.headers.common["Authorization"] =
                "Bearer " + res.data.bearer;
            commit("authentication", res.data.bearer);
            commit("Authorization", true);
            commit("user", res.data.user);
            commit("code", 200);
            await timeout(1000);
            if (res.data.user.role === "Admin") {
                // route.push("/admin");
                location.reload();
            } else {
                route.push("/member");
            }
        },

        async logout({ commit }) {
            axios
                .get("/auth/logout")
                .then(res => {
                    commit("authentication", {});
                    commit("Authorization", false);
                    commit("user", { role: "public", id: 0 });
                    commit("code", 200);
                    setTimeout(() => {
                        route.push("/");
                    }, 500);
                })
                .catch(error => {
                    console.log(error);
                    commit("authentication", {});
                    commit("Authorization", false);
                    commit("user", { role: "public", id: 0 });
                    commit("code", 401 + "forbidden");
                    route.push("/");
                });
        },
        async isAuth({ state }) {
            return state.user.role;
        },
        async checkAuth({ commit }) {
            axios
                .get("/user")
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    localStorage.clear();
                    console.log(error);
                    // if (error.match(/401/g)) {
                    commit("authentication", {});
                    commit("Authorization", false);
                    commit("user", { role: "public", id: 0 });
                    commit("code", 200);
                    route.push("/login");
                    // }
                });
        }
    },
    modules: {},

    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
});