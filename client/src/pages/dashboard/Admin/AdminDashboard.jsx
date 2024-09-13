import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import canvas from '../../../photo/canvas.png';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';

export function AdminDashboard() {
  const { role, username } = useContext(GlobalContext);
  const [carList, setCarList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/carList', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => setCarList(data.data))
      .catch(err => console.error(err))
  }, []);

  if (role !== 'admin') {
    return <NoPage />;
  }

  function deleteCar(id) {
    fetch('http://localhost:3001/api/carList/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          navigate('/')
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-center">Admin {username}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
            This week
          </button>
        </div>
      </div>
      <img className='d-block mx-lg-auto img-fluid' src={canvas} alt="canvas" />
      <h2 className='mt-5'>Car list</h2>
      <div className="table-responsive-lg">
        <table className="table table-striped">
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Year</th>
              <th scope="col">Added</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {carList.length === 0 ? <thead><tr><th>Empty</th></tr></thead> : <tbody>
            {
              carList.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td className='p-1'><img style={{ width: '100px' }} src={car.image} alt={car.image} /></td>
                  <td>{car.name}</td>
                  <td>{car.price} $</td>
                  <td>{car.selectedType}</td>
                  <td>{car.year}</td>
                  <td>{car.created.slice(0, 19).replace('T', ' ')}</td>
                  <td className='text-end'><button className='btn btn-primary rounded-pill py-1 px-3'>Edit</button>
                    <button onClick={() => deleteCar(car.id)} className='btn btn-danger rounded-pill py-1 px-3'>Delete</button></td>
                </tr>
              ))
            }
          </tbody>}
        </table>
      </div>
    </div>
  )
}