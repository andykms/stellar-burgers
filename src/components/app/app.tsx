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
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getIngredients } from '../../actions/ApiActions';
import { useSelector } from '../../services/store';
import { getIngredientsList } from '../../slices/ingredientsSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsAuth());
    dispatch(getIngredients());
  }, []);
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const onCloseModal = () => {
    navigate(-1);
  };
  return (
    <>
      <Routes location={backgroundLocation||location}>
        <Route
          path={'/'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <ConstructorPage />
            </div>
          }
        />
        <Route path={'/feed'} element={<Feed />}/>
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
        </Route>
        <Route
          path={'/feed/:number'}
          element={
          <>
            <AppHeader />
            <OrderInfo />
          </>
          }
        />
        <Route
          path={'/ingredients/:id'}
          element={
          <>
            <AppHeader />
            <IngredientDetails />
          </>
          }
        />
        <Route
          path={'/ingredients/:id'}
          element={
          <>
            <AppHeader />
            <IngredientDetails />
          </>
          }
        />
        <Route
            path={'/profile/orders/:number'}
            element={
            <>
              <AppHeader />
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            </>
            }
          />
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>

     {/*Модальное окно для просмотра заказа*/}
      <Routes>
        <Route
          path={'/feed/:number'}
          element={
            <Modal title='' onClose={onCloseModal}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>

      {/*Модальное окно для просмотра ингредиента*/}
      {backgroundLocation && <Routes>
        <Route
          path={'/ingredients/:id'}
          element={
            <Modal title='' onClose={onCloseModal}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>}

      <Routes>
        <Route
            path={'/profile/orders/:number'}
            element={
              <ProtectedRoute>
                <Modal title='' onClose={onCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
      </Routes>
    </>
  );
}

export default App;
