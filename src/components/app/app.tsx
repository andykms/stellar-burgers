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
import { useEffect } from 'react';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { useDispatch } from '../../services/store';
import { checkIsAuth, getFeeds } from '../../actions/ApiActions';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getIngredients } from '../../actions/ApiActions';
import { getOrders } from '../../actions/ApiActions';
import { ProdectedUnauthRoute } from '../ProtectedUnauthRoute/ProtectedAuthRoute';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkIsAuth());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const onCloseModal = () => {
    navigate(-1);
  };
  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route
          path={'/'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <ConstructorPage />
            </div>
          }
        />
        <Route
          path={'/feed'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <Feed />
            </div>
          }
        />
        <Route
          path={'/feed/:number'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <OrderInfo />
            </div>
          }
        />
        <Route
          path={'/login'}
          element={
            <div className={styles.app}>
              <ProdectedUnauthRoute>
                <AppHeader />
                <Login />
              </ProdectedUnauthRoute>
            </div>
          }
        />
        <Route
          path={'/register'}
          element={
            <div className={styles.app}>
              <ProdectedUnauthRoute>
                <AppHeader />
                <Register />
              </ProdectedUnauthRoute>
            </div>
          }
        />
        <Route
          path={'/forgot-password'}
          element={
            <div className={styles.app}>
              <ProdectedUnauthRoute>
                <AppHeader />
                <ForgotPassword />
              </ProdectedUnauthRoute>
            </div>
          }
        />
        <Route
          path={'/reset-password'}
          element={
            <div className={styles.app}>
              <ProdectedUnauthRoute>
                <AppHeader />
                <ResetPassword />
              </ProdectedUnauthRoute>
            </div>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <div className={styles.app}>
                <AppHeader />
                <Profile />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile/orders'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path={'/ingredients/:id'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path={'/profile/orders/:number'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            </div>
          }
        />
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>

      {/*Модальное окно для просмотра заказа*/}
      {backgroundLocation && (
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
      )}

      {/*Модальное окно для просмотра ингредиента*/}
      {backgroundLocation && (
        <Routes>
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal title='' onClose={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {backgroundLocation && (
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
      )}
    </>
  );
}

export default App;
