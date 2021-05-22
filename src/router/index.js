import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/auth.vue";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "",
        name: "Base",
        component: () =>
            import ("../components/base.vue"),
        meta: { rule: "Admin" },
        children: [{
                path: "/",
                name: "Home",
                component: Home,
                meta: { rule: "public" }
            },
            {
                path: "/login",
                name: "Login",
                component: Home,
                meta: { rule: "public" }
            },
            {
                path: "/member",
                name: "Member-dashboard",
                component: () =>
                    import ("../views/Member-profile.vue"),
                meta: { rule: "public" }
            },
            {
                path: "/details/:id",
                name: "Details",
                component: () =>
                    import ("../views/Details.vue"),
                meta: { rule: "public" }
            }
        ]
    },
    {
        path: "",
        name: "Dashboard",
        component: () =>
            import ("../components/dashboard.vue"),
        meta: { rule: "Admin" },
        children: [{
                path: "/admin/",
                name: "Administrator",
                component: () =>
                    import ("../views/Admin"),
                meta: { rule: "Admin" }
            },
            {
                path: "/admin/redeem",
                name: "Redeem",
                component: () =>
                    import ("../views/dashboard/list-redeem.vue"),
                meta: { rule: "Admin" }
            },
            {
                path: "/admin/list-image",
                name: "Icon List",
                component: () =>
                    import ("../views/dashboard/list-icon.vue"),
                meta: { rule: "Admin" }
            },
            {
                path: "/admin/member",
                name: "List Member",
                component: () =>
                    import ("../views/dashboard/list-member"),
                meta: { rule: "Admin" }
            },
            {
                path: "/admin/page-setting",
                name: "Page Setting",
                component: () =>
                    import ("../views/dashboard/page-settings.vue"),
                meta: { rule: "Admin" }
            },
            {
                path: "/admin/transaction-callback",
                name: "Riwayat Pembayarn",
                component: () =>
                    import ("../views/dashboard/transaction-callback.vue"),
                meta: { rule: "Admin" }
            }
        ]
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/oracle/dashboard/", //process.env.BASE_URL,
    routes
});
// router.beforeEach((to, from, next) => {
//     console.log(from);
//     if (from.path === "/member" && from.query.token) {
//         next("/member");
//     } else {
//         next();
//     }
//     next();
// });
export default router;