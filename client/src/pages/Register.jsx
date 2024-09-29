import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export function Register() {
    const navigate = useNavigate();
    const { message, errMessage, updateMessage, updateErrMessage } = useContext(GlobalContext);

    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [roleIsValid, setRoleIsValid] = useState(false);
    const [roleErr, setRoleErr] = useState('');
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

    function isValidRole() {
        if (role === '') {
            setRoleErr('Please choose role.');
            setRoleIsValid(false);
        } else {
            setRoleErr(false);
            setRoleIsValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (username && email && password && role) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, email, password, role }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        updateMessage(data.msg);
                        navigate('/login');
                    }

                    if (data.status === 'err') {
                        updateErrMessage(data.msg);
                    }
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div className="container mt-3 col-6 col-lg-3 center">
            {message && <div className="alert alert-success" role="alert">{message}</div>}
            {errMessage && <div className="alert alert-danger" role="alert">{errMessage}</div>}
            <form onSubmit={handleSubmit}>
                <h1 className="h1 mb-3 mt-3 fw-normal">Please sign up</h1>
                <div className="form-floating mb-1">
                    <input onChange={(e) => setUsername(e.target.value)} type="text" onBlur={isValidUsername} className={`form-control ${usernameErr ? 'is-invalid' : ''} ${usernameIsValid ? 'is-valid' : ''}`} id="username" />
                    <label htmlFor="username">Username</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {usernameErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={(e) => setEmail(e.target.value)} type="email" onBlur={isValidEmail} className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailIsValid ? 'is-valid' : ''}`} id="email" />
                    <label htmlFor="email">Email address</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {emailErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" onBlur={isValidPassword} className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordIsValid ? 'is-valid' : ''}`} id="password" />
                    <label htmlFor="password">Password</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {passwordErr}
                    </div>
                </div>
                <div className="form-floating mb-1">
                    <input onChange={(e) => setRepass(e.target.value)} type="password" onBlur={isValidRepass} className={`form-control ${repassErr ? 'is-invalid' : ''} ${repassIsValid ? 'is-valid' : ''}`} id="repass" />
                    <label htmlFor="repass">Repeat password</label>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {repassErr}
                    </div>
                </div>
                <div className="text-start my-3">
                    <select id="role" onChange={(e) => setRole(e.target.value)} value={role} onBlur={isValidRole} className={`form-select ${ roleErr ? 'is-invalid' : ''} ${ roleIsValid ? 'is-valid' : ''}`} required>
                        <option value=''>Choose role</option>
                        <option value="2">Seller</option>
                        <option value="3">Buyer</option>
                    </select>
                    <div className="valid-feedback"></div>
                    <div className="invalid-feedback">
                        {roleErr}
                    </div>
                </div>
                <button className="btn btn-primary w-50 py-2" type="submit" disabled={!usernameIsValid || !emailIsValid || !passwordIsValid || !repassIsValid}>Sign up</button>
                <p className='my-3 text-center text-body-secondary'>or</p>
                <Link to='/login' className="btn btn-outline-primary w-100 py-2">Login</Link>
            </form>
        </div>
    )
}