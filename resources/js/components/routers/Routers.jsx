import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageAbout from "../views/public/PageAbout/PageAbout";
import PageDashboard from "../views/private/PageDashboard/PageDashboard";
import PageUsers from "../views/private/PageUsers/PageUsers";
import PageContact from "../views/public/PageContact/PageContact";
import PageHome from "../views/public/PageHome/PageHome";
import Games from "../views/public/Games/Games";
import PriceList from "../views/private/PriceList/PriceList";
import PageBrands from "../views/private/PageBrands/PageBrands";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/lists" element={<PriceList />} />
        <Route path="/brands" element={<PageBrands />} />
        {/* <Route path="/about" element={<PageAbout />} />
        <Route path="/contactus" element={<PageContact />} />
        <Route path="/games" element={<Games />} />
        <Route path="/dashboard" element={<PageDashboard />} />
        <Route path="/users" element={<PageUsers />} /> */}
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(<Routers />);