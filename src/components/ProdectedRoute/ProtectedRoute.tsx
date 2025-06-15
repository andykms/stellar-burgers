import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsChekedAuth } from '../../slices/user/userSlice';
import { getIsAuth } from '../../slices/user/userSlice';

export interface ProtecedRouteProps {
  children: React.ReactNode;
  onOnlyUnAuth: boolean;
}

export const ProtectedRoute = ({
  children,
  onOnlyUnAuth
}: ProtecedRouteProps) => {
  const isCheked = useSelector(getIsChekedAuth);
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();
  if (!isCheked) {
    return <Preloader />;
  }

  if (!isAuth && !onOnlyUnAuth) {
    return <Navigate to='/login' state={{ from: location.pathname }} />;
  }

  if (isAuth && onOnlyUnAuth) {
    if (location.state) return <Navigate to={location.state.from} replace />;
    else return <Navigate to={'/profile'} replace />;
  }

  return <>{children}</>;
};
