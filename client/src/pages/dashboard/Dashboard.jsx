import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Login } from '../Login';
import { AdminDashboard } from '../dashboard/Admin/AdminDashboard';
import { SellerDashboard } from '../dashboard/Seller/SellerDashboard';
import { BuyerDashboard } from '../dashboard/Buyer/BuyerDashboard';

export function Dashboard() {
  const { role } = useContext(GlobalContext);

  let content = <Login />;

  if (role === 'admin') {
    content = <AdminDashboard />;
  }

  if (role === 'seller') {
    content = <SellerDashboard />;
  }

  if (role === 'buyer') {
    content = <BuyerDashboard />;
  }

  return (
    <>
      {content}
    </>
  )
}