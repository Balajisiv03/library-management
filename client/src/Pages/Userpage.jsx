import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";

const Userpage = () => {
  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");
  const [borrowData, setBorrowData] = useState({
    title: "",
    author: "",
    quantity: 1, // Default quantity to 1
  });

  const [borrowSuccess, setBorrowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
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

  const borrowBook = () => {
    const { title, author, quantity } = borrowData;

    if (!title || !author || quantity <= 0) {
      alert("Please fill in all fields and provide a valid quantity.");
      return;
    }

    const bookToBorrow = booklist.find(
      (book) => book.title === title && book.author === author
    );

    // Check if the book exists
    if (!bookToBorrow) {
      alert("The specified book does not exist.");
      return;
    }

    // Check if the requested quantity is available
    if (quantity > bookToBorrow.quantity) {
      alert("The requested quantity exceeds available stock.");
      return;
    }

    Axios.post("http://localhost:3001/borrowbook", {
      title,
      quantity,
    })
      .then((response) => {
        console.log("Book borrowed successfully:", response.data);

        // Update the booklist after successful borrowing
        setBooklist((prevBooklist) =>
          prevBooklist.map((book) =>
            book.title === title
              ? { ...book, quantity: book.quantity - quantity }
              : book
          )
        );

        setBorrowData({ title: "", author: "", quantity: 1 });

        setBorrowSuccess(true);

        setTimeout(() => {
          setBorrowSuccess(false);
        }, 3000);
      })

      .catch((error) => {
        console.error("Error borrowing book:", error);
      });
  };

  return (
    <div className="flex flex-col items-center bg-zinc-200 h-screen">
      <h1 className="text-3xl font-semibold mb-4 mt-8">Book List</h1>
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
            <th className="py-2 px-4 border">Subject</th>
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
                <td className="py-2 px-4 border">{book.title}</td>
                <td className="py-2 px-4 border">{book.author}</td>
                <td className="py-2 px-4 border">{book.subject} </td>
                <td className="py-2 px-4 border">{book.pdate} </td>
                <td className="py-2 px-4 border">{book.cost} </td>
                <td className="py-2 px-4 border">{book.quantity} </td>
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
      <h1 className="pt-5">Borrow a Book</h1>
      <form
        className=" pt-4 flex flex-row space-x-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          borrowBook();
        }}
      >
        <label htmlFor="title" className="my-2">
          Title:
          <input
            type="text"
            id="title"
            value={borrowData.title}
            className="py-1 px-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) =>
              setBorrowData({ ...borrowData, title: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="author" className="my-2">
          Author:
          <input
            type="text"
            id="author"
            value={borrowData.author}
            className="py-1 px-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) =>
              setBorrowData({ ...borrowData, author: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="quantity" className="my-2">
          Quantity:
          <input
            type="number"
            id="quantity"
            value={borrowData.quantity}
            onChange={(e) =>
              setBorrowData({
                ...borrowData,
                quantity: parseInt(e.target.value, 10),
              })
            }
            className="py-1 px-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </label>
        <button
          type="submit"
          className=" mt-5 text-slate-900 hover:bg-blue-500"
        >
          Borrow Book
        </button>
      </form>
      {borrowSuccess && (
        <div className="text-green-600 mt-2">Book borrowed successfully!</div>
      )}
      <Link to="/borrowed-books" className="my-4 text-blue-500">
        View Borrowed Books
      </Link>
      <button
        onClick={handleLogout}
        type="submit"
        className=" mt-5 text-slate-900 hover:bg-blue-500"
      >
        Log out
      </button>
    </div>
  );
};

export default Userpage;
