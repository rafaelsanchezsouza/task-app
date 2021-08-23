import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ssraf-task-app-backend.herokuapp.com',
  // baseURL: 'http://localhost:3333',
});

export default api;
