import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NoPage } from '../NoPage';
import defaultUserPhoto from '../../photo/default.png';
import { Link } from 'react-router-dom';

export function Profile() {
  const { role, message, username, updateUserPhoto, updateMessage } = useContext(GlobalContext);
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [userPhoto, setUserphoto] = useState('');
  const [userId, setUserId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [money, setMoney] = useState(0);
  const [userMoney, setUserMoney] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/funds', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => setUserMoney(data.funds))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'include',
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setSurname(data.data.surname)
          setMobile(data.data.mobile)
          setAddress(data.data.address)
          setUserphoto(data.data.user_photo)
          updateUserPhoto(data.data.user_photo)
          setUserId(data.data.users_info_id)
        }
      })
      .catch(err => console.error(err))
  }, []);

  if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
    return <NoPage />;
  }

  function updateFunds(e) {
    setMoney(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault();

    fetch('http://localhost:3001/api/funds', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        money
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          updateMessage(data.msg)
        }
      })
      .catch(err => console.error(err))
  }


  return (
    <div className="container my-5">
      <div className="row">
        {message ? <div className="alert alert-success fade show" role="alert">{message}</div> : ''}
        {role === 'buyer' ?
          <div className='text-end'>
            <button onClick={() => setShowForm(!showForm)} type="button" data-bs-toggle="modal" className='btn btn-primary rounded-3'>Add funds</button>
            <div className={`modal fade ${showForm ? 'show' : ''}`} style={{ display: `${showForm ? 'block' : 'none'}` }} id="moneyModal" tabIndex="-1">
              <div className="modal-dialog" style={{ transform: 'translateY(100px)' }}>
                <div className="modal-content rounded">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add funds</h1>
                    <button onClick={() => setShowForm(!showForm)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={submitHandler}>
                      <div className="mb-3">
                        <label htmlFor="money" className="col-form-label">Amount</label>
                        <input onChange={updateFunds} type="number" className="form-control rounded" id="money" value={money}></input>
                      </div>
                      <button onClick={() => setShowForm(!showForm)} type="submit" className="btn btn-primary rounded mx-1">Confirm</button>
                      <button onClick={() => setShowForm(!showForm)} type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : ''}
        <div className="d-flex justify-content-end col-12 col-lg-5 col-md-3 col-sm-12">
            <div className="col-4 mt-4">
              <p>Balance: {userMoney}</p>
            </div>
          <div className="py-5">
            <img className='rounded-circle' style={{ width: '150px', height: '150px', objectFit: 'cover' }} src={userPhoto ? userPhoto : defaultUserPhoto} alt={userPhoto ? userPhoto : defaultUserPhoto} />
          </div>
        </div>
        <div className="col-12 col-xl-6 col-lg-6 col-md-9 col-sm-12 col-xs-12">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-center">Profile info</h4>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row mb-3 border-bottom">
                  <div className="col-3">
                    <h5 className="mb-0">Name</h5>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {username}
                  </div>
                </div>
                <div className="row mb-3 border-bottom">
                  <div className="col-3">
                    <h5 className="mb-0">Surname</h5>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {surname}
                  </div>
                </div>
                <div className="row mb-3 border-bottom">
                  <div className="col-3">
                    <h5 className="mb-0">Mobile</h5>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {mobile}
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <h5 className="mb-0">Address</h5>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {address}
                  </div>
                </div>
              </div>
            </div>
            {surname ? '' : <Link className="mt-4 btn btn-primary rounded-pill col-3 mx-5" to='/profile/add'>Add info</Link>}
            <Link className="mt-4 btn btn-warning col-3 rounded-pill" to={`${userId}/edit`}>Edit profile</Link>
          </div>
        </div>
      </div>
    </div>
  )
}