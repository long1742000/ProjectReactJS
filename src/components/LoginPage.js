import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import information from "../store/Information";

const LoginPage = () => {

    const navigate = useNavigate();

    const [account, setAccount] = useState(information);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);

    const clickLogin = () => {
        if (username !== account.username) {
            toast.error("Incorrect username !!!")
        }
        else if (password !== account.password) {
            toast.error("Incorrect password !!!")
        }
        else {
            setLoading(true);
            setTimeout(() => {
                localStorage.setItem('user', JSON.stringify(account));
                navigate("/");
                toast.success("Log in success !!!")
            }, 2000)

        }
    }

    return (
        <div className="loginPage m-auto col-12 col-sm-4">
            <br />
            <h3>Log in</h3>
            <input type="text" className="form-control mb-2" placeholder="Username..."
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            ></input>
            <div className="inputPass">
                <input type={type} className="form-control mb-2" placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <div className="eyePass">
                    <svg hidden={type === "password" ? false : true} onClick={() => setType("text")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                    <svg hidden={type === "text" ? false : true} onClick={() => setType("password")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                </div>
            </div>
            <button className="btn btn-danger mb-2 btnLogin" disabled={username && password ? false : true}
                onClick={() => { clickLogin() }}
            >{loading && <i className="fa fa-circle-o-notch fa-spin"></i>} Login</button>
            <button className="btn btn-light" onClick={() => { navigate('/') }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg> Go back</button>
        </div>
    )
}

export default LoginPage;