import axios from 'axios';

const TIMEOUT = 60 * 1000;

const axiosOrder = axios.create({
  baseURL: 'http://api.erzo.wtf/',
  timeout: TIMEOUT
});

export default axiosOrder;
