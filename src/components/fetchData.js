import axios from "./axios.js";

const fetchData = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postNewUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}

export { fetchData, postNewUser };