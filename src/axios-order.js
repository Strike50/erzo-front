import axios from 'axios';

const TIMEOUT = 60 * 1000;

const axiosOrder = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: TIMEOUT,
});

export default axiosOrder;
