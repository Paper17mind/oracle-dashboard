import axios from "axios"
export default {
    async list() {
        return axios.get('voucher/list').then(res => {
            return Object.keys(res.data).map(function(val) {
                const data = res.data;
                return {
                    name: val,
                    icon: !data[val][0] || data[val][0].icon_url,
                    status: !data[val][0] || data[val][0].status,
                }
            })
        })
    },
    async show(name) {
        return axios.get('voucher/show/' + name)
    },
    async topup(data) {
        return axios.post('voucher/topup')
    }
}