import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = () => {
    return axios.get('https://reqres.in/api/users?page=1');
}

export default fetchData;