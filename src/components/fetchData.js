import axios from "./axios.js";
import { useEffect, useState } from "react";

const fetchData = (page) => {
    return axios.get(`/api/users?page=${page}`);
}

export default fetchData;