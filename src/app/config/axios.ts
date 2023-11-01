import axios from 'axios';

const baseURL = 'https://school.flatheadinteractive.com';

export default axios.create({
    baseURL: baseURL
});
