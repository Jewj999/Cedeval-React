import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.CEDEVAL_SERVICES_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: false,
});
