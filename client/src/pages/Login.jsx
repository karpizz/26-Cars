import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export function Login() {
  const { updateEmail, updateUsername, updateLoginStatus, updateRole } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  
  function updateEmailLogin(e) {
    setEmail(e.target.value);
  }

  function updatePasswordLogin(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'ok') {
            updateLoginStatus(true);
            updateEmail(data.user.email);
            updateUsername(data.user.username);
            updateRole(data.user.role);
            navigate('/dashboard');
          } else {
            setErr(data.msg)
          }
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="container col-6 col-lg-3 my-5 text-center">
      <div className="form-signin">
        <form onSubmit={handleSubmit}>
          <h1 className="h1 mb-3 fw-normal">Please login</h1>
          {err ? <span className="badge text-bg-danger rounded-pill mb-3">{err}</span> : ''}
          <div className="form-floating">
            <input onChange={updateEmailLogin} type="email" className="form-control mb-1" id="email" required/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input onChange={updatePasswordLogin} type="password" className="form-control" id="password" required/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-50 py-2" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}