import axios from "axios";
import store from "../store";

axios.defaults.headers.common[
    "Authorization"
] = `Bearer ${store.state.authentication}`;

export default {
    async index() {
        return axios.get("pages").then(res => {
            return res.data;
        });
    },
    async store(data) {
        let fd = new FormData();
        fd.append("title", data.title);
        fd.append("description", data.description);
        fd.append("photo", data.file);
        fd.append("is_slide", data.is_slide || true);
        fd.append("is_draft", data.is_draft || false);
        return axios.post("/admin/pages", fd);
    },
    async update(data) {
        let fd = new FormData();
        fd.append("title", data.title);
        fd.append("description", data.description);
        fd.append("photo", data.file);
        fd.append("is_slide", data.is_slide || true);
        fd.append("is_draft", data.is_draft || false);
        return axios.post("/admin/pages/" + data.id, fd);
    },
    async destroy(id) {
        return axios.delete("/admin/pages/" + id);
    }
};