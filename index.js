import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import connectDB from "./api/config/db.js";
import errorHandler from "./api/middlewares/errorHandler.js";
import userRoute from "./api/routes/userRoute.js";
import catRoute from "./api/routes/catRoute.js";
import tagRoute from "./api/routes/tagRoute.js";
import articleRoute from "./api/routes/articleRoute.js";
import dashboardRoute from "./api/routes/dashboardRoutes.js";

// init express
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://vercel.app" || "https://query-orpin.vercel.app" || "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("api/public"));

// env config
dotenv.config();

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/admin", userRoute);
app.use("/api/v1/category", catRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/", dashboardRoute);

// express error handler
app.use(errorHandler);

// init env variables
const PORT = process.env.PORT || 8080;

// listen server
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server is not running");
  } else {
    connectDB();
    console.log(`server is running at http://localhost:${PORT}`.bgGreen.black);
  }
});
