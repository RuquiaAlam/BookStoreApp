import { Router } from "express";
import { Book } from "../models/bookModel.js";
import { error } from "ajv/dist/vocabularies/applicator/dependencies.js";

const router = Router();
//POST REQUEST
router.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: `Send all required fields:title,author,publishYear` });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//GET REQUEST TO GET ALL BOOKS
router.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
//Route for Get One Book from the Database by id
router.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(
      book
    );
  } catch (err) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
//Route to update a Book
router.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: `Send all the required fields:title,author,publishYear`,
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: `Book not found` });
    }
    return response.status(200).send({ message: `Book updated successfully` });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
//DELETE One book
router.delete("/books/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: `Book not found` });
    }
    return response.status(200).send({ message: `Book deleted successfully` });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
export default router;
