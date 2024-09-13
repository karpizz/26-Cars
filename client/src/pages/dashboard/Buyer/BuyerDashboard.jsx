
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';

export function BuyerDashboard() {
  const { role, username } = useContext(GlobalContext);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/carList', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => setCarList(data.data))
      .catch(err => console.error(err))
  }, []);

  if (role !== 'buyer') {
    return <NoPage />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-center">Buyer {username}</h1>
      </div>
      <h2 className='mt-5'>Cars to buy</h2>
      <div className="table-responsive min-vh-100">
        <table className="table table-striped">
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
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
              carList.map(car => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.name}</td>
                  <td>{car.price} $</td>
                  <td>{car.selectedType}</td>
                  <td>{car.year}</td>
                  <td>{car.created.slice(0, 19).replace('T', ' ')}</td>
                  <td className='text-end'><button className='btn btn-primary rounded-pill py-1 px-3'>Buy</button></td>
                </tr>
              ))
            }
          </tbody>}
        </table>
      </div>
    </div>
  )
}