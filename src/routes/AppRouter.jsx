import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";

import routes from "../config/routes";
import PhilosopherGrid from "../components/PhilosopherGrid";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Existing Home Page */}
        <Route path={routes.Home} element={<App/>} />

        {/* Wisdom Wall Page */}
        <Route path="/philosophergrid" element={<PhilosopherGrid />} />
      </Routes>

    </BrowserRouter>
  );
};

export default AppRouter;