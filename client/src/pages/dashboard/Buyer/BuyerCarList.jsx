
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';
import { Link } from 'react-router-dom';

export function BuyerCarList() {
  const { role, userMoney } = useContext(GlobalContext);
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
      <div className="row">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap mt-5 border-bottom">
          <h2>Cars to buy</h2>
          <p style={{ fontSize: '20px' }}>Balance: {userMoney}</p>
        </div>
      </div>
      <div className="row mt-5">
        {carList.length === 0 ? <p>Empty...</p> : <>
          {
            carList.map(car => (
              <ul className="list-group mb-2" key={car.id} style={{ listStyle: 'none' }}>
                <li>
                  <Link to={`/car/${car.id}`} className="list-group-item list-group-item-primary">
                    {car.name} {car.price}$ {car.status === 'sold' ? <span className="badge bg-danger">Sold!</span> : <span className="badge bg-success">{car.status}</span>}
                  </Link>
                </li>
              </ul>
            ))
          }
        </>}
      </div>
    </div>
  )
}