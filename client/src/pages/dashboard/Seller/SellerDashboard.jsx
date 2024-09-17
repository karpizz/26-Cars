import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';

export function SellerDashboard() {

  const { role, username, updateMessage } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);
  const [money, setMoney] = useState(0);
  const [userMoney, setUserMoney] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/funds', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => setUserMoney(data.funds))
      .catch(err => console.error(err))
  }, []);

  if (role !== 'seller') {
    return <NoPage />;
  }

  function updateFunds(e) {
    setMoney(e.target.value)
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(money);

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
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-5 text-center">
          {[...Array(1)].map((e, i) => <div className="mx-4 mt-5 spinner-grow text-success" key={i} role="status"></div>)}
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
            {userMoney}
          </div>
          <h1>Welcome {username} to your {role}'s dashboard</h1>
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
                    <button onClick={() => setShowForm(!showForm)} type="submit" className="btn btn-primary rounded">Confirm</button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button onClick={() => setShowForm(!showForm)} type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}