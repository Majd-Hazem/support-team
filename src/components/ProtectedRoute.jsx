import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, userType } = useAuth();

  // إذا المستخدم مش داخل أو مش admin → يرجع على login
  if (!isAuthenticated || userType !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // إذا كل شيء تمام → يعرض الصفحة
  return children;
};

export default ProtectedRoute;
