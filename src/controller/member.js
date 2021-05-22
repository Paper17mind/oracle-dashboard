import axios from "axios";
import store from "../store";

axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${store.state.authentication}`;

export default {
    async index() {
        return axios.get("/admin/member");
    },
    async store(data) {
        return axios.post("/admin/member", data);
    },
    async update(data, id) {
        return axios.put("/admin/member/" + id, data);
    },
    async destroy(id) {
        return axios.delete("/admin/user/" + id);
    },
    // user
    async indexUser() {
        return axios.get("/admin/user");
    },
    async storeUser(data) {
        return axios.post("/admin/user", data);
    },
    async updateUser(data, id) {
        return axios.put("/admin/user/" + id, data);
    }
};