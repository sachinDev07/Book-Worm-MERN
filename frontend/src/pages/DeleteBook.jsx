import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Deletebook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl min-w-[250px] max-w-[600px] p-4  mx-auto">
        <p className="text-center text-2xl mt-4">
          Are You Sure You want to delete this book?
        </p>
        <button
          onClick={handleDeleteBook}
          className="my-8 text-xl text-white text-center w-full bg-red-600 py-4"
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default Deletebook;
