import {Outlet} from 'react-router-dom';
import { Header } from '../componets/Header';
import { Footer } from '../componets/Footer';
import { Carousel } from '../componets/Carousel';

export function PublicLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Carousel/>
            <Footer/>
        </>
    )
}