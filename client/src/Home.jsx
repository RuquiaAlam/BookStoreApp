import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import BooksData from "./components/BooksData";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/user/books")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center gap-x-4">
        <h1 className="text-3xl my-8 ">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : <BooksData books={books} />}
    </div>
  );
}
export default Home;
