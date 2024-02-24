import { useState } from "react";
import Axios from "axios";

const Adminpage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [pdate, setPdate] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [booklist, setBooklist] = useState([]);
  const [showdetails, setShowdetails] = useState(false);

  const [search, setSearch] = useState("");

  function showlist() {
    if (!showdetails) {
      Axios.get("http://localhost:3001/getdata").then((response) => {
        setBooklist(response.data);
        console.log("Data :", response);
      });
    } else {
      setBooklist([]);
    }
    setShowdetails(!showdetails);
    console.log("check");
  }

  function deletedetail(title) {
    Axios.delete(`http://localhost:3001/deletedetail/${title}`)
      .then((response) => {
        setBooklist(
          booklist.filter((val) => {
            return val.title !== title;
          })
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        console.error("Status Code:", error.response.status);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, author, subject, pdate, cost, quantity);

    if (!title || !subject || !author || !pdate || !cost || !quantity) {
      alert("fill all the fields");
      return;
    }
    Axios.post("http://localhost:3001/insertdata", {
      title,
      author,
      subject,
      pdate,
      cost,
      quantity,
    })
      .then(() => {
        console.log("inserted successfully");
        alert("Book details added");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-8">
        {showdetails && (
          <div className="mt-5">
            <label className="h-creen w-[50vw] pb-5" htmlFor="search">
              <h2 className="mt-10">Search data</h2>
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
                      <td className="py-2 px-4 border">{book.title}</td>
                      <td className="py-2 px-4 border">{book.author}</td>
                      <td className="py-2 px-4 border">{book.subject} </td>
                      <td className="py-2 px-4 border">{book.pdate} </td>
                      <td className="py-2 px-4 border">{book.cost} </td>
                      <td className="py-2 px-4 border">{book.quantity} </td>

                      <td>
                        <button
                          type="button"
                          className=" hover:bg-blue-300 text-gray-800 font-bold py-1 px-2 rounded-md transition-colors uppercase text-center"
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
        )}
      </div>
      <form
        className="bg-zinc-600 shadow-md rounded pt-6 px-10 mb-4 pb-8 w-[80vw] mt-20"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-100">Add a Book</h1>
        <div className="grid px-4 py-4">
          <label htmlFor="title">
            <b>Title:</b>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="enter name."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <label htmlFor="author">
            <b>Author:</b>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="enter author name."
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <label htmlFor="subject">
            <b>Subject:</b>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="enter subject."
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <label htmlFor="pdate">
            <b>Publish Date:</b>
            <input
              type="date"
              name="pdate"
              id="pdate"
              onChange={(e) => {
                setPdate(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <label htmlFor="cost">
            <b>Cost:</b>
            <input
              type="number"
              name="cost"
              id="cost"
              onChange={(e) => {
                setCost(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <label htmlFor="quantity">
            <b>Quantity:</b>
            <input
              type="number"
              name="quantity"
              id="quantity"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </label>
          <br />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={showlist}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
            >
              {showdetails ? "Hide Details" : "Book Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminpage;
