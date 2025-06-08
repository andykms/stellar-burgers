import { Navigate } from "react-router-dom";
import { useSelector } from "../../services/store";
import { getIsAuth } from "../../slices/userSlice";

export const ProdectedUnauthRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isAuth = useSelector(getIsAuth);

  return isAuth ? <>{children}</> : <Navigate to={'/'} replace={true}/>;
};