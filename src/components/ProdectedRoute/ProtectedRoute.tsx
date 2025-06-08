import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';
import { getIsChekedAuth } from '../../slices/userSlice';
import { getIsAuth } from '../../slices/userSlice';

export interface ProtecedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecedRouteProps) => {
  const isCheked = useSelector(getIsChekedAuth);
  const isAuth = useSelector(getIsAuth);

  if (!isCheked) {
    return <Preloader />;
  }

  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};
