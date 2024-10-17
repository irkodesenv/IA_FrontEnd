import axios from 'axios'
import token_csrf from './token_csrf'

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_PATH_API,
    headers: {
        'X-CSRFToken': token_csrf
    }
})

export default apiInstance