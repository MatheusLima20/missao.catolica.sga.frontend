import axios from 'axios';

export const baseURL = import.meta.env.VITE_URL;

export default axios.create({
    baseURL: baseURL
});
