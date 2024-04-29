import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

const Login = () => {

    // const url="https://reminder-3jth.onrender.com/";
    const url = "http://localhost:8080/";

    const [email, setUserName] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const { user, dispatch } = useAuthContext();

    useEffect(() => {
        if (user) {
            navigate('/');
            return;
        }
    }, [user])

    function loginUser(e) {
        e.preventDefault();

        axios.post(url + 'login', { email, password })
            .then((r) => {
                localStorage.setItem('user', JSON.stringify(r.data));
                dispatch({ type: 'LOGIN', payload: r.data }); //useAuthContext gets data from here
                navigate('/');
            })
            .catch((e) => {
                setError(e.response.data.error);
            })
    }

    return (
        <div className="container">
            <Navbar />
            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h3 className="text-center my-3 fw-bold text-primary">JobyJob</h3>
                    <form onSubmit={loginUser}>




                        <h1 class="h3 mb-3 fw-normal text-center my-3">Login</h1>

                        <div class="form-floating">
                            <input type="email" class="form-control my-1" id="floatingInput" onChange={(e) => setUserName(e.target.value)} placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="d-grid gap-2 col-6 pt-2 mx-auto">
                            <button class="btn btn-primary w-100 py-2 my-1" type="submit">Login</button>
                        </div>
                        <div className="text-center my-2">
                            <span>If not already register </span><Link to={'/signup'}>Signup</Link>
                        </div>

                        {error && <div className="text-danger">{error}</div>}

                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;