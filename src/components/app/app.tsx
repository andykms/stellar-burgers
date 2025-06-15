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
import { useDispatch, useSelector } from '../../services/store';
import { checkIsAuth } from '../../actions/ApiActions';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getIngredients } from '../../actions/ApiActions';
import { ProdectedUnauthRoute } from '../ProtectedUnauthRoute/ProtectedAuthRoute';
import { getCurrentOrder } from '../../slices/feed/feedSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkIsAuth());
  }, [dispatch]);

  const ModalTitles = {
    INGREDIENT_DETAILS: 'Детали ингредиента'
  };

  const navigate = useNavigate();
  const location = useLocation();

  const currentOrder = useSelector(getCurrentOrder);
  const orderDetailTitleComponent = (
    <span className={styles.detailOrder}>
      #{String(currentOrder?.number).padStart(6, '0')}
    </span>
  );
  const ingredientDetailTitleComponent = (
    <span className={`${styles.detailIngredient} text text_type_main-large`}>
      {ModalTitles.INGREDIENT_DETAILS}
    </span>
  );
  const backgroundLocation = location.state?.background;

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
              <div className={styles.infoWithoutModal}>
                {orderDetailTitleComponent}
                <OrderInfo />
              </div>
            </div>
          }
        />
        <Route
          path={'/login'}
          element={
            <div className={styles.app}>
              <ProtectedRoute onOnlyUnAuth>
                <AppHeader />
                <Login />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path={'/register'}
          element={
            <div className={styles.app}>
              <ProtectedRoute onOnlyUnAuth>
                <AppHeader />
                <Register />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path={'/forgot-password'}
          element={
            <div className={styles.app}>
              <ProtectedRoute onOnlyUnAuth>
                <AppHeader />
                <ForgotPassword />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path={'/reset-password'}
          element={
            <div className={styles.app}>
              <ProtectedRoute onOnlyUnAuth>
                <AppHeader />
                <ResetPassword />
              </ProtectedRoute>
            </div>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute onOnlyUnAuth={false}>
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
              <ProtectedRoute onOnlyUnAuth={false}>
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
              <div className={styles.infoWithoutModal}>
                {ingredientDetailTitleComponent}
                <IngredientDetails />
              </div>
            </div>
          }
        />
        <Route
          path={'/profile/orders/:number'}
          element={
            <div className={styles.app}>
              <AppHeader />
              <ProtectedRoute onOnlyUnAuth={false}>
                <div className={styles.infoWithoutModal}>
                  {orderDetailTitleComponent}
                  <OrderInfo />
                </div>
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
              <Modal
                title={orderDetailTitleComponent}
                onClose={() => navigate('/feed')}
              >
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
              <Modal
                title={ModalTitles.INGREDIENT_DETAILS}
                onClose={() => navigate(-1)}
              >
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
              <ProtectedRoute onOnlyUnAuth={false}>
                <Modal
                  title={orderDetailTitleComponent}
                  onClose={() => navigate('/profile/orders')}
                >
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
