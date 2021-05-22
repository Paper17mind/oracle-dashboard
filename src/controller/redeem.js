import axios from "axios";
import store from "../store";

axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${store.state.authentication}`;

export default {
    async index() {
        return axios.get("admin/redeem");
    },
    async store(data) {
        return axios.post("admin/redeem", data);
    },
    async update(data) {
        return axios.put("admin/redeem/" + data.id, data);
    },
    async destroy(id) {
        return axios.delete("admin/redeen/" + id);
    }
};