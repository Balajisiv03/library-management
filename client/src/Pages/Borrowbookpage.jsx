import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const BorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  const gotouserpage = () => {
    navigate("/Userpage");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getBorrowedBooks")
      .then((response) => {
        setBorrowedBooks(response.data);
        console.log("Borrowed Books Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error.message);
      });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 mt-4">Borrowed Books</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Author</th>
              {/* Add other necessary columns */}
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td className="py-2 px-4 border">{book.title}</td>
                <td className="py-2 px-4 border">{book.author}</td>
                {/* Add other necessary columns */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={gotouserpage}
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
      >
        Prev Page
      </button>
    </div>
  );
};

export default BorrowedBooksPage;
