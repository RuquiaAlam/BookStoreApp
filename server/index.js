import express from "express";
import { PORT } from "./config.js";
import { MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";

import bookRouter from "./routes/book.js";

const app = express();
//Middleware  for handling CORS policy
//Option1:Allow All Origin  with default cors(*)
// app.use(cors())

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     method: ["GET,POST,PUT,DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send(`Hello how r u`);
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/user", bookRouter);
