import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import AdmPage from "./Pages/Admpage";
// import Searchdetails from "./Pages/Searchdetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route path="/AdmPage" element={<AdmPage />} />
      <Route path="/HomePage" element={<Home />} />
      {/* <Route path="/searchdetails" element={<Searchdetails />} /> */}
    </Routes>
  );
};

export default AllRoutes;
