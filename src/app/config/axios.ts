import axios from "axios";

const baseURL: string = "http://localhost:3001";

export default axios.create({
    baseURL: baseURL
});


