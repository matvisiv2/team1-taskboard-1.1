import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:${process.env.SERVER_URL || 4444}/api`,
});

export default instance;