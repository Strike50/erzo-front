import axios from 'axios';

const TIMEOUT = 60 * 1000;
console.log(process.env.NODE_ENV);
const baseUrl = process.env.NODE_ENV === 'production' ? 'http://api.erzo.wtf' : 'http://localhost:3001';
const axiosOrder = axios.create({
  baseURL: baseUrl,
  timeout: TIMEOUT,
});

export default axiosOrder;
