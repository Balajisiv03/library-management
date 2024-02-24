// const Addbook = () => {
//   return (
//     <div>
//       <form
//         className="bg-zinc-600 shadow-md rounded pt-6 px-10 mb-4 pb-8 w-[80vw] mt-20"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-gray-100">Add a Book</h1>
//         <div className="grid px-4 py-4">
//           <label htmlFor="title">
//             <b>Title:</b>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               placeholder="enter name."
//               onChange={(e) => {
//                 setTitle(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <label htmlFor="author">
//             <b>Author:</b>
//             <input
//               type="text"
//               name="author"
//               id="author"
//               placeholder="enter author name."
//               onChange={(e) => {
//                 setAuthor(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <label htmlFor="subject">
//             <b>Subject:</b>
//             <input
//               type="text"
//               name="subject"
//               id="subject"
//               placeholder="enter subject."
//               onChange={(e) => {
//                 setSubject(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <label htmlFor="pdate">
//             <b>Publish Date:</b>
//             <input
//               type="date"
//               name="pdate"
//               id="pdate"
//               onChange={(e) => {
//                 setPdate(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <label htmlFor="cost">
//             <b>Cost:</b>
//             <input
//               type="number"
//               name="cost"
//               id="cost"
//               onChange={(e) => {
//                 setCost(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <label htmlFor="quantity">
//             <b>Quantity:</b>
//             <input
//               type="number"
//               name="quantity"
//               id="quantity"
//               onChange={(e) => {
//                 setQuantity(e.target.value);
//               }}
//               className="py-1 px-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </label>
//           <br />
//           <div className="flex space-x-4">
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
//             >
//               Submit
//             </button>
//             <button
//               type="button"
//               onClick={showlist}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-md transition-colors uppercase block ml-4 text-center"
//             >
//               {showdetails ? "Hide Details" : "Book Details"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Addbook;
