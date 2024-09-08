import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

export function UserHeader() {
  const { role, updateEmail, updateUsername, updateLoginStatus, updateRole} = useContext(GlobalContext);
  const navigate = useNavigate();

    function logOut() {
      fetch('http://localhost:3001/api/logout', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }, 
        credentials: 'include',
      })
      .then(() => {
        updateLoginStatus(false);
        updateEmail('');
        updateUsername('');
        updateRole('');
        navigate('/');
      })
      .catch(console.error)
    }

    const publicLinks = <>
          <li className="nav-item"><Link to="/login" className="nav-link link-body-emphasis px-2">Login</Link></li>
          <li className="nav-item"><Link to="/register" className="nav-link link-body-emphasis px-2">Sign up</Link></li>
          <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
      </>

    const adminLinks = <>
            <li className="nav-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2">Dashboard</Link></li>
            <li className="nav-item"><Link to="/users" className="nav-link link-body-emphasis px-2">Users</Link></li>
            <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
      </>

    const buyerLinks = <>
          <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2">Buyer profile</Link></li>
          <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
    </>

    const sellerLinks = <>
          <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2">Seller profile</Link></li>
          <li className="nav-item"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
      </>

    let extraLinks = <></>;

    if (role === 'admin') {
      extraLinks = adminLinks;
    } else if (role === 'buyer') {
      extraLinks = buyerLinks;
    } else if (role === 'seller') {
      extraLinks = sellerLinks;
    } else {
      extraLinks = publicLinks;
    }

    return (
      <div className="navbar navbar-expang-lg d-flex flex-wrap bg-primary">
        <div className="container">
      <ul className="nav me-auto">
        <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2" aria-current="page">Home</Link></li>
      </ul>
      <ul className="nav">
        {extraLinks}
      </ul>
      </div>
    </div>
    )
}