import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors'

const app = express();

app.use(express.json());

// Middleware for handling CORS POLICY
// -> Option 1: Allow all origins with default of CORS(*)
app.use(cors());

// -> Option 2: Allow custom origins
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to World!");
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
