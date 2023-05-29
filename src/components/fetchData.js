import axios from "./axios.js";
import { useEffect, useState } from "react";

const fetchData = () => {
    return axios.get('/api/users?page=1');
}

export default fetchData;