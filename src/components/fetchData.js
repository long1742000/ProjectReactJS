import axios from "./axios.js";

const fetchData = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

const postNewUser = (name, first_name, last_name) => {
    return axios.post("/api/users", { name, first_name, last_name });
}

export { fetchData, postNewUser };