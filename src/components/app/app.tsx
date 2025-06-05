import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '@components';
import { ProtectedRoute } from '../ProdectedRoute/ProtectedRoute';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { Modal } from '@components';
import { useState } from 'react';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';

function App() {

  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <div className={styles.app}>
            <AppHeader />
            <ConstructorPage />
          </div>
        }
      ></Route>
      <Route path={'/feed'} element={<Feed></Feed>}>
        <Route path={':number'} element={<Modal title='' onClose={()=>{}}><OrderInfo/></Modal>}></Route>
      </Route>
      <Route path={'/ingredients/:id'} element={<Modal title='' onClose={()=>{}}><IngredientDetails/></Modal>}></Route>
      <Route path={'/login'} element={<ProtectedRoute><Login/></ProtectedRoute>}></Route>
      <Route path={'/register'} element={<ProtectedRoute><Register/></ProtectedRoute>}></Route>
      <Route path={'/forgot-password'} element={<ProtectedRoute><ForgotPassword/></ProtectedRoute>}></Route>
      <Route path={'/reset-password'} element={<ProtectedRoute><ResetPassword/></ProtectedRoute>}></Route>
      <Route path={'/profile'} element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
      <Route path={'/profile/orders'} element={<ProtectedRoute><ProfileOrders/></ProtectedRoute>}>
        <Route path={':number'} element={<Modal title='' onClose={()=>{}}><OrderInfo/></Modal>}></Route>
      </Route>
      <Route path={'*'} element={<NotFound404/>}></Route>
    </Routes>
  );
}

export default App;
