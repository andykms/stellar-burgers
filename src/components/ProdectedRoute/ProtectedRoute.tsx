import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router-dom';
import { isLoadUserInfo, isChekedAuth } from '../../slices/userSlice';
import { getUserInfo } from '../../slices/userSlice';
import { checkIsAuth } from '../../actions/ApiActions';
import { useEffect } from 'react';

export interface ProtecedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecedRouteProps) => {
  const isCheked = useSelector(isChekedAuth);
  const userInfo = useSelector(getUserInfo);

  if (!isCheked) {
    return <Preloader />;
  }

  if (!userInfo.email || !userInfo.name) {
    return <Navigate to='/login' replace={true}/>;
  }

  return <>{children}</>;
};
