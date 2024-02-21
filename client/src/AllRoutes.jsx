import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
// import Searchdetails from "./Pages/Searchdetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      {/* <Route path="/searchdetails" element={<Searchdetails />} /> */}
    </Routes>
  );
};

export default AllRoutes;
