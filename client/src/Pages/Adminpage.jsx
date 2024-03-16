import { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Addbook from "./Addbook";

const Adminpage = () => {
  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/getdata")
      .then((response) => {
        setBooklist(response.data);
        console.log("Data :", response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  function deletedetail(title) {
    Axios.delete(`http://localhost:3001/deletedetail/${title}`)
      .then((response) => {
        setBooklist((prevList) =>
          prevList.filter((val) => val.title !== title)
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        console.error("Status Code:", error.response.status);
      });
  }

  const handleLogout = () => {
    navigate("/");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full container mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mt-10 mb-4">Book Management</h2>
        <label className="w-[50vw] pb-5" htmlFor="search">
          <h2 className="mt-10">
            Search data <p>(By title,author,genre)</p>
          </h2>

          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearch(e.target.value)}
            className="py-1 px-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </label>
        <table className="w-full border-collapse border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              <th className="py-2 px-4 border">Genre</th>
              <th className="py-2 px-4 border">Publish date</th>
              <th className="py-2 px-4 border">Cost</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {booklist
              .filter((book) => {
                const searchitem = search.toLowerCase();
                return (
                  book.title.toLowerCase().includes(searchitem) ||
                  book.author.toLowerCase().includes(searchitem) ||
                  book.subject.toLowerCase().includes(searchitem)
                );
              })
              .map((book) => (
                <tr key={book.id}>
                  <td className="py-2 px-4 border text-center">{book.title}</td>
                  <td className="py-2 px-4 border text-center">
                    {book.author}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {book.subject}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {formatDate(book.pdate)}
                  </td>
                  <td className="py-3 px-4 border text-center">{book.cost}</td>
                  <td className="py-2 px-4 border text-center">
                    {book.quantity}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="hover:bg-blue-300 text-gray-800 font-bold py-1 px-2 rounded-md transition-colors uppercase text-center"
                      onClick={() => {
                        deletedetail(book.title);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            {booklist.length > 0 &&
              booklist.filter((book) => {
                const searchitem = search.toLowerCase();
                return (
                  book.title.toLowerCase().includes(searchitem) ||
                  book.author.toLowerCase().includes(searchitem) ||
                  book.subject.toLowerCase().includes(searchitem)
                );
              }).length === 0 && (
                <tr>
                  <td colSpan="7" className="py-2 px-4 border text-center">
                    No result
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      <div className="mb-8 flex items-center justify-center space-x-4">
        <Link
          to="/addbook"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
        >
          Add Books
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Adminpage;
