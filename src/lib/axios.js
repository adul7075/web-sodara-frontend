import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://web-sodara-backend-production.up.railway.app',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export const csrf = () => axios.get('/sanctum/csrf-cookie')

export default axios