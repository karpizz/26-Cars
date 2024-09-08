import { Outlet } from 'react-router-dom';
import { UserHeader } from '../componets/UserHeader';
import { Footer } from '../componets/Footer';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { BuyerDashboard } from '../pages/dashboard/BuyerDashboard';
import { SellerDashboard } from '../pages/dashboard/SellerDashboard';

export function UserLayout() {

    const { role } = useContext(GlobalContext);

    let content = <div className='container text-center my-5'>Please login</div>;
    
    if (role === 'admin') {
        content = <Outlet />;
    }

    if (role === 'seller') {
        content = <SellerDashboard />;
    }

    if (role === 'buyer') {
        content = <BuyerDashboard />;
    }

    return (
        <>
            <UserHeader />
            {content}
            <Footer />
        </>
    )
}