import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { NoPage } from '../NoPage';
import defaultUserPhoto from '../../photo/default.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function AddProfile() {
  const { role, updateMessage, message } = useContext(GlobalContext);
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [userPhoto, setUserphoto] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/profile', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //     credentials: 'include',
  //   }).then(res => res.json())
  //     .then(data => {
  //       if (data.status === 'ok') {
  //         setUsers(data.data);
  //       }
  //     })
  //     .catch(err => console.error(err))
  // }, []);

  if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
    return <NoPage />;
  }

  function updateSurname(e) {
    setSurname(e.target.value)
  }

  function updateMobile(e) {
    setMobile(e.target.value)
  }

  function updateAddress(e) {
    setAddress(e.target.value)
  }

  function updateUserphoto(e) {
    const formData = new FormData();
    formData.append('image_file', e.target.files[0]);

    fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
      .then(data => setUserphoto(`http://localhost:3001/${data.path}`))
      .catch(err => console.log(err))
  }

  // function updateEditprofile() {

  // }

  function submitHandler(e) {
    e.preventDefault();

    fetch('http://localhost:3001/api/profile', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        surname,
        mobile,
        address,
        userPhoto,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          updateMessage(data.msg)
          navigate('/profile')
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container my-5">
      <div className="row">
        {message ? <div className="alert alert-success fade show" role="alert">{message}</div> : ''}
        <div className="d-flex justify-content-end col-4 col-lg-5 col-md-6 col-sm-12">
          <div className="align-items-center py-5">
            <label htmlFor="userPhoto">
              <img className='rounded-circle' style={{ width: '150px', height: '150px', cursor: 'pointer', objectFit: 'cover' }} src={userPhoto ? userPhoto : defaultUserPhoto} alt={userPhoto ? userPhoto : defaultUserPhoto} />
            </label>
            <input style={{ display: 'none' }} onChange={updateUserphoto} id="userPhoto" type="file" />
          </div>
        </div>
        <div className="col-auto col-lg-5 col-md-6 col-sm-12">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-center">Add personal info</h4>
            </div>
            <form onSubmit={submitHandler}>
              <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                <label htmlFor='surname' className="labels">Surname</label>
                <input type="text" onChange={updateSurname} value={surname} id='surname' className="form-control" placeholder="surname" autoComplete='on' />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                <label htmlFor='mobile' className="labels">Mobile Number</label>
                <input type="text" onChange={updateMobile} value={mobile} id='mobile' className="form-control" placeholder="phone number" autoComplete='on' />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
                <label htmlFor='address' className="labels">Address</label>
                <input type="text" onChange={updateAddress} value={address} id='address' className="form-control" placeholder="address" autoComplete='on' />
              </div>
              <button className="mt-4 btn btn-primary" type="submit">Save profile</button>
              <Link className="mt-4 btn btn-primary mx-5" to='/profile'>Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}