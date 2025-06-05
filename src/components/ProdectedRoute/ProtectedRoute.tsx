import { selectors } from "src/slices/burgerSlice";
import { useSelector } from "src/services/store";
import { Preloader } from "@ui";
import { Navigate } from "react-router-dom";

export interface ProtecedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecedRouteProps) => {
  const isAuthCkecked = useSelector(selectors.isAuthChecked);
  const userInfo = useSelector(selectors.userInfo);
  
  if (!isAuthCkecked) {
    return <Preloader/>
  }

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};