import { selectors } from "../../slices/burgerSlice";
import { useSelector } from "../../services/store";
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


  return <>{children}</>;
};