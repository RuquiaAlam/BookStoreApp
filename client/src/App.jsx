import { useState, useEffect } from "react";

import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreateBook from "./CreateBook";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";
import ShowBook from "./ShowBook";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5555/user/books")
      .then((response) => console.log(response.data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
    </Routes>
  );
}

export default App;
