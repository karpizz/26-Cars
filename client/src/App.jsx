import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { ContextWrapper } from './context/GlobalContext';
import { PublicLayout } from './layout/PublicLayout';
import { UserLayout } from './layout/UserLayout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { NoPage } from './pages/NoPage';
import { Users } from './pages/users/Users';
import { Editprofile } from './pages/users/Editprofile';
import { SellerCars } from './pages/dashboard/Seller/SellerCars';
import { Dashboard } from './pages/dashboard/Dashboard';
import { SellerEditCar } from './pages/dashboard/Seller/SellerEditCar';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route index path='/register' element={<Register />}></Route>
            <Route index path='/login' element={<Login />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/cars' element={<SellerCars />}></Route>
            <Route path='/cars/:carId/edit' element={<SellerEditCar />}></Route>
            <Route path='/users' element={<Users />}></Route>
            <Route path='/profile' element={<Editprofile />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<NoPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;

{/* <Routes>
  <Route path="/" element={<Dashboard />}>
    <Route path="messages" element={<DashboardMessages />}/>
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes> */}