import { useEffect, useState } from "react";
import Axios from "axios";

const BorrowedBooksPage = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

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
    <div>
      <h1 className="text-3xl font-semibold mb-4 mt-8">Borrowed Books</h1>
      <table className="w-full border-collapse border border-gray-200 rounded-md">
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
  );
};

export default BorrowedBooksPage;
