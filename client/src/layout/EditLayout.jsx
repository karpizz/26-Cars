import {Outlet} from 'react-router-dom';
import { Header } from '../componets/Header';
import { Footer } from '../componets/Footer';
import { EditCar } from '../pages/dashboard/EditCar';

export function EditLayout() {
    return (
        <>
            <Header/>
            <EditCar/>
            <Footer/>
        </>
    )
}