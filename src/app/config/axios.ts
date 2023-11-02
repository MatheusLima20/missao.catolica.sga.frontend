import axios from 'axios';

export const baseURL = 'https://school.flatheadinteractive.com';

export default axios.create({
    baseURL: baseURL
});
