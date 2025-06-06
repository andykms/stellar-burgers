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
import { useEffect, useState } from 'react';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { checkIsAuth } from '../../actions/ApiActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsAuth());
  }, [dispatch]);

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
      />
      <Route path={'/feed'} element={<Feed />}>
        <Route
          path={':number'}
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
      <Route
        path={'/ingredients/:id'}
        element={
          <Modal title='' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path={'/login'}
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/register'}
        element={
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/forgot-password'}
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/reset-password'}
        element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/profile'}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path={'/profile/orders'}
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      >
        <Route
          path={':number'}
          element={
            <Modal title='' onClose={() => {}}>
              <OrderInfo />
            </Modal>
          }
        />
      </Route>
      <Route path={'*'} element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
