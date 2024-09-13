import { useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';

export function SellerDashboard() {

  const { role, updateCars, username } = useContext(GlobalContext);

  //fetch all car list for table
  useEffect(() => {
    fetch('http://localhost:3001/api/carList', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => updateCars(data.data))
      .catch(err => console.error(err))
  }, []);

  if (role !== 'seller') {
    return <NoPage />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-5 text-center min-vh-100">
          <h1>Welcome {username} to your {role}'s dashboard</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, vitae?</p>
        </div>
      </div>
    </div>
  )
}