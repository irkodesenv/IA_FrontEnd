import axios from 'axios'
import token_csrf from './token_csrf'

const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'X-CSRFToken': token_csrf
    }
})

export default apiInstance