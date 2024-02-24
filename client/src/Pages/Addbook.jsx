import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Addbook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [pdate, setPdate] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const gotoadminpage = () => {
    navigate("/Adminpage");
  };
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
    <div className="bg-zinc-500 shadow-md rounded py-10 px-10 mb-4 pb-8 w-full">
      <div>
        <form
          className="bg-zinc-500 shadow-md rounded py-5 px-10 mb-4 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-gray-100 ml-5">Add a Book</h1>
          <div className="grid px-4 py-4 mb-4">
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
            </div>
          </div>
        </form>
        <button
          onClick={gotoadminpage}
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
        >
          Prev Page
        </button>
      </div>
    </div>
  );
};

export default Addbook;
