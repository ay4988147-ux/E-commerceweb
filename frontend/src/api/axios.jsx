import axios from 'axios';

const api = axios.create({
    baseURL: " https://e-commerceweb-4-mkab.onrender.com/api",
});

export default api;