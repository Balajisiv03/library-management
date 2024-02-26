import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Borrowbookpage = () => {
  const [booklist, setBooklist] = useState([]);
  const [search, setSearch] = useState("");

  const [borrowData, setBorrowData] = useState({
    title: "",
    author: "",
    quantity: 1,
  });

  const navigate = useNavigate();

  const gotouserpage = () => {
    navigate("/Userpage");
  };
  const [borrowSuccess, setBorrowSuccess] = useState(false);

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

    if (!bookToBorrow) {
      alert("The specified book does not exist.");
      return;
    }

    if (quantity > bookToBorrow.quantity) {
      alert("The requested quantity exceeds available stock.");
      return;
    }

    Axios.post("http://localhost:3001/borrowbook", {
      title,
      author,
      quantity,
    })
      .then((response) => {
        console.log("Book borrowed successfully:", response.data);

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
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="pt-5">Borrow a Book</h1>
      <form
        className="pt-4 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          borrowBook();
        }}
      >
        <label htmlFor="title" className="h-creen w-[50vw] my-2">
          Title:
          <input
            type="text"
            id="title"
            value={borrowData.title}
            className="py-1 px-2 rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) =>
              setBorrowData({ ...borrowData, title: e.target.value })
            }
            // onBlur={fetchAuthor}
            required
          />
        </label>
        <label htmlFor="author" className="h-creen w-[50vw] my-2">
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
        <label htmlFor="quantity" className="h-creen w-[50vw] my-2">
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
          className="h-creen w-[50vw] mt-5 text-slate-900 px-1 py-1 hover:bg-blue-500 rounded-md"
        >
          Borrow Book
        </button>
      </form>
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
      <table className="h-creen w-[50vw] border-collapse border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Author</th>
            <th className="py-2 px-4 border">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {booklist
            .filter((book) => {
              const searchitem = search.toLowerCase();
              return (
                book.title.toLowerCase().includes(searchitem) ||
                book.author.toLowerCase().includes(searchitem)
              );
            })
            .map((book) => (
              <tr key={book.id}>
                <td className="py-2 px-4 border text-center">{book.title}</td>
                <td className="py-2 px-4 border text-center">{book.author}</td>
                <td className="py-2 px-4 border text-center">
                  {book.quantity}
                </td>
              </tr>
            ))}
          {booklist.length > 0 &&
            booklist.filter((book) => {
              const searchitem = search.toLowerCase();
              return (
                book.title.toLowerCase().includes(searchitem) ||
                book.author.toLowerCase().includes(searchitem)
              );
            }).length === 0 && (
              <tr>
                <td colSpan="6" className="py-2 px-4 border text-center">
                  No result
                </td>
              </tr>
            )}
        </tbody>
      </table>

      {borrowSuccess && (
        <div className="text-green-600 mt-2 text-center">
          Book borrowed successfully!
        </div>
      )}
      <button
        onClick={gotouserpage}
        type="submit"
        className="mt-5 mb-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md transition-colors uppercase block ml-4 text-center"
      >
        Prev Page
      </button>
    </div>
  );
};

export default Borrowbookpage;

//   const fetchAuthor = () => {
//     const selectedBook = booklist.find(
//       (book) => book.title === borrowData.title
//     );
//     if (selectedBook) {
//       setBorrowData((prevData) => ({
//         ...prevData,
//         author: selectedBook.author,
//       }));
//     } else {
//       alert("Book not found. Please enter a valid title.");
//     }
//   };
