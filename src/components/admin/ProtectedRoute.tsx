import { useAdmin } from "@/contexts/AdminContext";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAdmin();
  const location = useLocation();
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div>Cargando...</div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return children;
};