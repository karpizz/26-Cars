
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';
import { useParams } from 'react-router-dom';
import Toast from '../../../componets/Toast';

export function BuyerCar() {
  const { role, userMoney, updateMessage, updateErrMessage, message, errMessage, updateUserMoney } = useContext(GlobalContext);
  const [car, setCar] = useState([]);
  const { carId } = useParams();

  useEffect(() => {
    fetch('http://localhost:3001/api/carList/' + carId, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      }
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          if (data.car === undefined) {
            return;
          } else {
            setCar(data.car);
          }
        }
      })
      .catch(err => console.error(err))
  }, [carId]);

  if (role !== 'buyer') {
    return <NoPage />;
  }

  function handleBuy(carId, price) {
    if (userMoney >= price) {
      let purchase = (userMoney - price);

      fetch('http://localhost:3001/api/buyCar', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          carId,
          purchase,
        }),
      }).then(res => res.json())
        .then(data => {
          if (data.status === 'ok') {
            updateUserMoney(purchase, 0);
            updateMessage(data.msg);
          } else if (data.status === 'err') {
            updateErrMessage(data.msg);
          }
        })
        .catch(err => {
          console.error(err);
          updateErrMessage('An error occurred while processing your request.');
        });
    } else {
      updateErrMessage('Not enough money');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-end flex-wrap flex-md-nowrap border-bottom">
          <p style={{ fontSize: '20px' }}>Balance: {userMoney}</p>
        </div>
      </div>
      {message ? <Toast message={message} /> : ''}
      {errMessage ? <Toast errMessage={errMessage} /> : ''}
      {/* {errMessage ? <div className="alert alert-danger fade show" role="alert">{errMessage}</div> : ''} */}
      <div className="row">
        {car ?
          <section>
            <div className="container px-4 px-lg-5 my-5">
              <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4">
                <div className="mt-3">
                  <div className="card">
                    <img src={car.image} width='263px' alt=''></img>
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{car.name}</h5>
                        <div className="mb-2">
                          <div className="bi-star-fill">{car.year}</div>
                        </div>
                        <div className="bi-star-fill">{car.selectedType}</div>
                        <div className="bi-star-fill">{car.price}</div>
                        {car.status === 'sold' ? <span className="badge bg-danger">Sold!</span> : <span className="badge bg-success">{car.status}</span>}
                      </div>
                    </div>
                    <div className="card-footer text-center p-4 pt-0 border-top-0 bg-transparent">
                      <button onClick={() => handleBuy(car.id, car.price)} disabled={car.status === 'sold'} className='btn btn-primary rounded-pill py-1 px-3'>Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          : ''}
      </div>
    </div>
  )
}