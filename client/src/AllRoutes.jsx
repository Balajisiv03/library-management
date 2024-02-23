import { Route, Routes } from "react-router-dom";
import Adminpage from "./Pages/Adminpage";
import Auth from "./Pages/Auth";
import Userpage from "./Pages/Userpage";
import Borrowbookpage from "./Pages/Borrowbookpage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route path="/Userpage" element={<Userpage />} />
      <Route path="/Adminpage" element={<Adminpage />} />
      <Route path="/borrowed-books" element={<Borrowbookpage />} />
    </Routes>
  );
};

export default AllRoutes;
