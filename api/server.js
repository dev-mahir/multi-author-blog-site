import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoute from "./routes/userRoute.js";
import catRoute from "./routes/catRoute.js";
import tagRoute from "./routes/tagRoute.js";
import articleRoute from "./routes/articleRoute.js";
import dashboardRoute from "./routes/dashboardRoutes.js";



// init express
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("api/public"));

// env config
dotenv.config();




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
