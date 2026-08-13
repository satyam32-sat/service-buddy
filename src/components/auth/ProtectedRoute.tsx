import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

const ProtectedRoute = ({
  children,
  role,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

// Wrong role
if (role && user.role !== role) {
  if (user.role === "client") {
    return <Navigate to="/client/dashboard" replace />;
  }

  if (user.role === "provider") {
    return <Navigate to="/provider/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }
}

  return <>{children}</>;
};

export default ProtectedRoute;