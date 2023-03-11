import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
app.use(morgan("tiny"));
app.use(express.static("api/public"));
app.use(cookieParser());

dotenv.config();


  //Enabling CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,DELETE,PATCH, POST,PUT");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});





app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", catRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/", dashboardRoute);


// handle not found route
app.use((req, res, next) => { 
  res.status(404).json({message: "Route not found"});
})


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
