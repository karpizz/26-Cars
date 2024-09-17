import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import defaultImg from '../photo/default.png';

export function UserHeader() {
  const { role, updateEmail, updateUsername, updateLoginStatus, updateRole, userImg } = useContext(GlobalContext);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  const menu = useRef(null);

  const closeMenu = (e) => {
    if (showLinks && !menu?.current?.contains(e.target)) {
      setShowLinks(false);
    }
  }
  document.addEventListener('mousedown', closeMenu)

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
  </>

  const adminLinks = <>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2">Dashboard</Link></li>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/users" className="nav-link link-body-emphasis px-2">Users</Link></li>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/profile" className="nav-link link-body-emphasis px-2">Profile</Link></li>
    <li className="dropdown-item border-top"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
  </>

  const buyerLinks = <>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2">Dashboard</Link></li>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/profile" className="nav-link link-body-emphasis px-2">Profile</Link></li>
    <li className="dropdown-item border-top"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
  </>

  const sellerLinks = <>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/dashboard" className="nav-link link-body-emphasis px-2">Dashboard</Link></li>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/cars" className="nav-link link-body-emphasis px-2">Cars</Link></li>
    <li onClick={() => setShowLinks(!showLinks)} className="dropdown-item"><Link to="/profile" className="nav-link link-body-emphasis px-2">Profile</Link></li>
    <li className="dropdown-item border-top"><button onClick={logOut} className="nav-link link-body-emphasis px-2">Logout</button></li>
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

  const menuStyle = {
    position: 'absolute',
    inset: 'auto auto auto auto',
    margin: '0px',
    transform: 'translate(-120px, 5px)'
  }

  return (
    <header className="p-3 mb-3 border-bottom text-bg-dark">
      <div className="container">
        <div ref={menu} className="d-flex">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0">
            <li className="nav-item"><Link to="/" className="nav-link link-body-emphasis px-2 text-white" aria-current="page">Home</Link></li>
          </ul>
          {/* <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          </form> */}
          <div className="col-auto dropdown text-end">
            <div onClick={() => setShowLinks(!showLinks)} className="d-block link-body-emphasis text-decoration-none dropdown-toggle" style={{ cursor: 'pointer' }}>
              <img src={userImg ? userImg : defaultImg} alt="mdo" width="32" height="32" className="rounded-circle" />
            </div>
            <ul className={`dropdown-menu text-small border rounded-3 ${showLinks ? 'show' : ''}`} style={menuStyle}>
              {extraLinks}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}