import axios from "axios";
import store from "../store";

axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${store.state.authentication}`;

export default {
    async index() {
        return axios.get("admin/redeem-code");
    },
    async store(data) {
        return axios.post("admin/redeem-code", data);
    },
    async update(data) {
        return axios.put("admin/redeem-code/" + data.id, data);
    },
    async destroy(id) {
        return axios.delete("admin/redeem-code/" + id);
    }
};