import { useSelector } from "../../services/store";
import { Preloader } from "@ui";
import { Navigate } from "react-router-dom";
import { isAuthChecked } from "../../slices/userSlice";
import { getUserInfo } from "../../slices/userSlice";

export interface ProtecedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtecedRouteProps) => {
  const isAuthCkecked = useSelector(isAuthChecked);
  const userInfo = useSelector(getUserInfo);
  
  if (!isAuthCkecked) {
    return <Preloader/>
  }

  if (!userInfo) {
    return <Navigate to="/login"/>
  }


  return <>{children}</>;
};