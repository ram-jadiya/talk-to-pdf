import { lazy } from "react";
// Lazy load all components
const Auth = lazy(() => import("../views/auth"));
const ChatWithPdf = lazy(() => import("../views/chatWithPdf"));
const Dashboard = lazy(() => import("../views/dashboard"));
const Pricing = lazy(() => import("../views/pricing"));
const CommonLayout = lazy(() => import("../components/laoyout/layout"));
const AuthLayout = lazy(() => import("../components/laoyout/authLayout"));
const PricingLayout = lazy(() => import("../components/laoyout/pricingLayout"));

export const routes = [
  {
    path: "/",
    element: Dashboard,
    isPrivate: true,
    layout: CommonLayout,
  },
  {
    path: "/auth",
    element: Auth,
    isPrivate: false,
    layout: AuthLayout,
  },
  {
    path: "/chatWithPdf/:pdfId",
    element: ChatWithPdf,
    isPrivate: true,
    layout: CommonLayout,
  },
  {
    path: "/pricing",
    element: Pricing,
    isPrivate: true,
    layout: PricingLayout,
  },
];
