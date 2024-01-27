import React, { ReactNode } from 'react'
import { useRecoilValue } from 'recoil';
import { Navigate, useLocation } from "react-router-dom"
import { userState } from "../store/atoms"
import { userStateType } from './types';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userData: userStateType = useRecoilValue(userState);
  let location = useLocation();

  if (!userData.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children

};

export default ProtectedRoute;