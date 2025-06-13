import { Navigate, To } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIsAuth } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const ProdectedUnauthRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isAuth = useSelector(getIsAuth);
  const navigate = useNavigate();
  const location = useLocation();
  if (isAuth) {
    if (location.state) return <Navigate to={location.state.from} replace />;
    else return <Navigate to={'/profile'} replace />;
  }

  return <>{children}</>;
};
