import axios from 'axios';

const response = await axios.get('http://10.11.100.122:8010/api/v1/get_csrf_token/', {
  withCredentials: true
});

export default response.data.csrfToken;