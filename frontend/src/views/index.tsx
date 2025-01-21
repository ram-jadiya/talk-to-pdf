import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../constants/routes";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/slices/authSlice";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated && location.pathname === "/auth") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export const Views = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element, isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={
            isPrivate ? (
              <PrivateRoute>
                <Element />
              </PrivateRoute>
            ) : (
              <PublicRoute>
                <Element />
              </PublicRoute>
            )
          }
        />
      ))}
    </Routes>
  );
};
