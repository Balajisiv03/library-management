import { Route, Routes } from "react-router-dom";
import Adminpage from "./Pages/Adminpage";
import Auth from "./Pages/Auth";
import Userpage from "./Pages/Userpage";
import Borrowbookpage from "./Pages/Borrowbookpage";
import Addbook from "./Pages/Addbook";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Auth />} />
      <Route path="/Userpage" element={<Userpage />} />
      <Route path="/Adminpage" element={<Adminpage />} />
      <Route path="/borrowed-books" element={<Borrowbookpage />} />
      <Route path="/Addbook" element={<Addbook />} />
    </Routes>
  );
};

export default AllRoutes;
