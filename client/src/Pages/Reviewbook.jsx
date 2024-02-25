import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating-stars-component";

const Reviewbook = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: "",
    author: "",
    review: "",
    rating: 0,
  });

  const navigate = useNavigate();

  const gotouserpage = () => {
    navigate("/Userpage");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/getreviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const postReview = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/postreview", newReview)
      .then((response) => {
        console.log(response.data);
        setReviews([
          ...reviews,
          {
            id: response.data.reviewId,
            ...newReview,
            createdAt: new Date().toLocaleString(),
          },
        ]);
        setNewReview({ title: "", author: "", review: "", rating: 0 });
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Book Reviews</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <form onSubmit={postReview} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newReview.title}
              onChange={(e) =>
                setNewReview({ ...newReview, title: e.target.value })
              }
              className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="author" className="mb-1 text-sm font-medium">
              Author
            </label>
            <input
              type="text"
              id="author"
              value={newReview.author}
              onChange={(e) =>
                setNewReview({ ...newReview, author: e.target.value })
              }
              className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="review" className="mb-1 text-sm font-medium">
              Review
            </label>
            <textarea
              id="review"
              value={newReview.review}
              onChange={(e) =>
                setNewReview({ ...newReview, review: e.target.value })
              }
              className="py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="rating" className="mb-1 text-sm font-medium">
              Rating
            </label>
            <Rating
              name="rating"
              count={5}
              value={newReview.rating}
              onChange={(rating) => setNewReview({ ...newReview, rating })}
              size={24}
              activeColor="#ffd700"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-500 transition-colors"
          >
            Post Review
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border p-4 rounded-md">
              <p className="font-semibold">
                {review.title} by {review.author}
              </p>
              <p>{review.review}</p>
              {/* <p className="text-sm text-gray-500">
                Posted At: {new Date(review.createdAt).toLocaleString()}
              </p> */}
              <p>
                {" "}
                <Rating
                  value={review.rating}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                />
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={gotouserpage}
        type="submit"
        className="mt-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md transition-colors uppercase block ml-4 text-center"
      >
        Prev Page
      </button>
    </div>
  );
};

export default Reviewbook;
