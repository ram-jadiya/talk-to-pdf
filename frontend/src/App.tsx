import { useLocation } from "react-router-dom";
import { Views } from "./views";
import { lazy, Suspense, useEffect, useMemo } from "react";
import Loading from "./components/Loading";
import { Toaster } from "./components/ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  updateUserInfo,
} from "./store/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import { AuthService } from "./services/authService";

const CommonLayout = lazy(() => import("./components/laoyout/layout"));
const AuthLayout = lazy(() => import("./components/laoyout/authLayout"));
const PricingLayout = lazy(() => import("./components/laoyout/pricingLayout"));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const AppLayout = useMemo(() => {
    if (!isAuthenticated) {
      return AuthLayout;
    }
    if (location.pathname === "/pricing") {
      return PricingLayout;
    }
    return CommonLayout;
  }, [location.pathname, isAuthenticated]);

  const { data: UserInfo } = useQuery({
    queryKey: ["verify-access-token"],
    queryFn: async () => {
      return await AuthService.verifyAccessToken();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (UserInfo) dispatch(updateUserInfo(UserInfo));
  }, [UserInfo]);

  return (
    <Suspense fallback={<Loading />}>
      <AppLayout>
        <Toaster />
        <Views />
      </AppLayout>
    </Suspense>
  );
}

export default App;
