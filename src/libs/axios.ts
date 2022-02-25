import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.CEDEVAL_SERVICES_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
});
