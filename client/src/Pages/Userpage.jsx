import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";

const Userpage = () => {
  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getdata")
      .then((response) => {
        setBooklist(response.data);
        console.log("Data:", response);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  return (
    <div className="flex flex-col items-center bg-zinc-200 h-screen">
      <h1 className="text-3xl font-semibold mb-4 mt-8">
        Total Books Available
      </h1>
      <label className="h-creen w-[50vw] pb-5" htmlFor="search">
        <h2>Search data</h2>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
                <td className="py-2 px-4 border text-center">{book.author}</td>
                <td className="py-2 px-4 border text-center">
                  {book.subject}{" "}
                </td>
                <td className="py-2 px-4 border text-center">
                  {formatDate(book.pdate)}
                </td>
                <td className="py-2 px-4 border text-center">{book.cost} </td>
                <td className="py-2 px-4 border text-center">
                  {book.quantity}{" "}
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
                <td colSpan="5" className="py-2 px-4 border text-center">
                  No result
                </td>
              </tr>
            )}
        </tbody>
      </table>

      <div className="flex space-x-4 mt-10">
        <Link
          to="/borrowed-books"
          className="my-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Borrow a Book
        </Link>
        <Link
          to={{
            pathname: "/Reviewbook",
            state: { title: "Book Title", author: "Author Name" },
          }}
          className="my-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
        >
          Review a Book
        </Link>

        <button
          onClick={handleLogout}
          type="submit"
          className=" bg-gray-500 hover:bg-gray-700 text-white font-bold my-4 px-4 py-2 rounded transition duration-300 ease-in-out"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Userpage;
