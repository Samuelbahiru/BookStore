import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";

import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// const cors = require("cors");

// middleware for parsing request body
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type",
  })
);
app.use("/books", booksRoute);

//database connection
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("the db is connected");
  })
  .catch((err) => {
    console.error("Error connecting to db", err);
  });

// this where the app listen to.
app.listen(PORT, () => {
  console.log("the server is started");
});
