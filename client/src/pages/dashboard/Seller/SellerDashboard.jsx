import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { NoPage } from '../../NoPage';

export function SellerDashboard() {

  const { role, username } = useContext(GlobalContext);

  if (role !== 'seller') {
    return <NoPage />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mt-5 text-center">
          {[...Array(1)].map((e, i) => <div className="mx-4 mt-5 spinner-grow text-success" key={i} role="status"></div>)}
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h1>Welcome {username} to your {role}'s dashboard</h1>
        </div>
      </div>
    </div>
  )
}