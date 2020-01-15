import axios from 'axios';

const TIMEOUT = 60 * 1000;

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://api.erzo.wtf' : 'http://localhost:3004';
const axiosOrder = axios.create({
  baseURL: baseUrl,
  timeout: TIMEOUT,
});

export default axiosOrder;
