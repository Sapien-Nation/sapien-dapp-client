import axios from 'axios';

const { NEXT_PUBLIC_API_URL: API_URL } = process.env;

const instance = axios.create({
  baseURL: API_URL
});

export default instance;
