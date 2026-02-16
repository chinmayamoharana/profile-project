import axios from 'axios';

const api = axios.create({
    baseURL: 'https://profile-project-d359.onrender.com/api', // Adjust if deployed
});

export default api;
