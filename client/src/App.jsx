import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ContextWrapper} from './context/GlobalContext';
import { PublicLayout } from './layout/PublicLayout';
import { UserLayout } from './layout/UserLayout';
import { EditLayout } from './layout/EditLayout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { NoPage } from './pages/NoPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { EditCar } from './pages/dashboard/EditCar';
import { Users } from './pages/users/Users';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home/>}></Route>
            <Route index path='/register' element={<Register/>}></Route>
            <Route index path='/login' element={<Login/>}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/users' element={<Users/>}></Route>
          </Route>
          <Route Component={EditLayout}>
            <Route path='/:carId/edit' element={<EditCar/>}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<NoPage/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
