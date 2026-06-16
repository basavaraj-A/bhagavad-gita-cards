import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import routes from "../config/routes";
import PhilosopherGrid from "../components/PhilosopherGrid";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import PhilosopherCards from "../pages/PhilosopherCards";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing Home Page */}
        <Route path={routes.Home} element={<App />} />
        <Route path="/philosopher/:name" element={<App />} />
        {/* Wisdom Wall Page */}
        <Route path="/philosophergrid" element={<PhilosopherGrid />} />
        {/* Admin pages */}
        <Route path={routes.adminLogin} element={<AdminLogin />} />
        <Route path={routes.adminDashboard} element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
