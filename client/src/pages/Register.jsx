import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setemailErr] = useState('');
    const [emailIsValid, setemailIsValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setpasswordErr] = useState('');
    const [passwordIsValid, setpasswordIsValid] = useState(false);
    const [repass, setRepass] = useState('');
    const [repassErr, setrepassErr] = useState('');
    const [repassIsValid, setrepassIsValid] = useState(false);

    function updateUsername(e) {
        setUsername(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function updateRepass(e) {
        setRepass(e.target.value);
    }

    function isValidUsername() {
        if (username.length < 2) {
            setUsernameErr('Name too short.');
            setUsernameIsValid(false);
        } else {
            setUsernameErr(false);
            setUsernameIsValid(true);
        }
    }

    function isValidEmail() {
        if (email.length < 6) {
            setemailErr('Email too short.');
            setemailIsValid(false);
        } else {
            setemailErr(false);
            setemailIsValid(true);
        }
    }

    function isValidPassword() {
        if (password.length < 6) {
            setpasswordErr('Password too short.');
            setpasswordIsValid(false);
        } else {
            setpasswordErr(false);
            setpasswordIsValid(true);
        }
    }

    function isValidRepass() {
        if (repass.length < 6 || password !== repass) {
            setrepassErr('Password too short or does not match.');
            setrepassIsValid(false);
        } else {
            setrepassErr(false);
            setrepassIsValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (username && email && password) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        navigate('/login');
                    }
                }
                )
                .catch(err => console.error(err))
        }
    }

    return (
        <div className="container mt-3 col-6 col-lg-3 center">
            <form onSubmit={handleSubmit}>
                <h1 className="h1 mb-3 mt-3 fw-normal">Please sign up</h1>
                <div className="form-floating mb-1">
                    <input onChange={updateUsername} type="text" onBlur={isValidUsername} className={`form-control ${usernameErr ? 'is-invalid' : ''} ${usernameIsValid ? 'is-valid' : ''}`} id="username" />
                    <label htmlFor="username">Username</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {usernameErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={updateEmail} type="email" onBlur={isValidEmail} className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailIsValid ? 'is-valid' : ''}`} id="email" />
                    <label htmlFor="email">Email address</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {emailErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={updatePassword} type="password" onBlur={isValidPassword} className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordIsValid ? 'is-valid' : ''}`} id="password" />
                    <label htmlFor="password">Password</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {passwordErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={updateRepass} type="password" onBlur={isValidRepass} className={`form-control ${repassErr ? 'is-invalid' : ''} ${repassIsValid ? 'is-valid' : ''}`} id="repass" />
                    <label htmlFor="repass">Repeat password</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {repassErr}
                    </div>
                </div>
                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Agree to <Link to='/'>Terms of Service</Link>
                    </label>
                </div>
                <button className="btn btn-primary w-50 py-2" type="submit" disabled={!usernameIsValid || !emailIsValid || !passwordIsValid || !repassIsValid}>Sign up</button>
                <p className='my-3 text-center text-body-secondary'>or</p>
                <Link to='/login' className="btn btn-outline-primary w-100 py-2">Login</Link>
            </form>
        </div>
    )
}