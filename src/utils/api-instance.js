import axios from 'axios'
import token_csrf from './token_csrf'

const apiInstance = axios.create({
    baseURL: 'http://10.11.100.122:8010/api/',
    headers: {
        'X-CSRFToken': token_csrf
    }
})

export default apiInstance