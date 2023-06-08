import { Link } from "react-router-dom";

const PleaseLogin = () => {
    return (
        <p>You must log in to use this function, <Link to="/login">Login</Link></p>
    )
}

export default PleaseLogin;