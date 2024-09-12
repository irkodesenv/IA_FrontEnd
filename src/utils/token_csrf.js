import axios from 'axios'

const response = await axios.get("http://127.0.0.1:8000/api/get-csrf-token/");

export default response.data.csrfToken