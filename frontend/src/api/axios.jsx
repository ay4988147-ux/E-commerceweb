import axios from 'axios';

const api = axios.create({
    baseURL: "https://e-commerceweb-3-cj1a.onrender.com/api",
});

export default api;