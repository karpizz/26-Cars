import {Outlet} from 'react-router-dom';
import { Header } from '../componets/Header';
import { Footer } from '../componets/Footer';

export function PublicLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}