import axios from 'axios';

const response = await axios.get(process.env.REACT_APP_BASE_PATH_API + '/v1/get_csrf_token/', {
  withCredentials: true
});

export default response.data.csrfToken;