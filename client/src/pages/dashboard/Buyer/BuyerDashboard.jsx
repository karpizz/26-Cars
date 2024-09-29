
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';
import { Link } from 'react-router-dom';

export function BuyerDashboard() {
  const { role, username, userMoney } = useContext(GlobalContext);

  if (role !== 'buyer') {
    return <NoPage />;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2 text-center">Welcome {username}</h1>
        <p style={{ fontSize: '20px' }}>Balance: {userMoney}</p>
      </div>
      <div className="row">
        <Link to='/carList'>Car list</Link>
      </div>
    </div>
  )
}