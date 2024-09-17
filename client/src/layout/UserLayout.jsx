import { Outlet } from 'react-router-dom';
import { UserHeader } from '../componets/UserHeader';
import { Footer } from '../componets/Footer';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { NoPage } from '../pages/NoPage';

export function UserLayout() {

    const { role } = useContext(GlobalContext);
    let content = <Outlet/>;

    if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
        content = <NoPage />;
      } 

    return (
        <>
            <header><UserHeader /></header>
            <main>{content}</main>
            <footer><Footer /></footer>
        </>
    )
}