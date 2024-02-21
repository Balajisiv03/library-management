import { useState } from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [pdate, setPdate] = useState("");
  const [booklist, setBooklist] = useState([]);
  const [showdetails, setShowdetails] = useState(false);

  const [search, setSearch] = useState("");

  // const searchdata = () => {
  //   Axios.get(`http://localhost:3001/getdata/${title}`).then((response) => {
  //     setTitle(response.data);
  //     console.log("Data :", response);
  //   });
  // };

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
    console.log(title, author, subject, pdate);

    if (!title || !subject || !author || !pdate) {
      alert("fill all the fields");
      return;
    }
    Axios.post("http://localhost:3001/insertdata", {
      title,
      author,
      subject,
      pdate,
    })
      .then(() => {
        console.log("inserted successfully");
        alert("Form submitted successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
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
      <div className="mb-8">
        {showdetails && (
          <div className="mt-5">
            <table className="w-full border-collapse border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-300">
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Author</th>
                  <th className="py-2 px-4 border">Subject</th>
                  <th className="py-2 px-4 border">Publish date</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {booklist
                  .filter((book) => {
                    const searchitem = search.toLowerCase();
                    return book.title.toLowerCase().includes(searchitem);
                  })
                  .map((book) => (
                    <tr key={book.id}>
                      <td className="py-2 px-4 border">{book.title}</td>
                      <td className="py-2 px-4 border">{book.author}</td>
                      <td className="py-2 px-4 border">{book.subject} </td>
                      <td className="py-2 px-4 border">{book.pdate} </td>
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
              </tbody>
            </table>
          </div>
        )}
      </div>
      <form
        className="bg-zinc-600 shadow-md rounded pt-6 px-10 mb-4 pb-8 w-[80vw]"
        onSubmit={handleSubmit}
      >
        <h1>Books details</h1>
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
              {/* <Link to="/searchdetails">Search Books</Link> */}
              {showdetails ? "Hide Details" : "Show Details"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
