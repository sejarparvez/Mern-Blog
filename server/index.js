const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Routes/routes");
const cookieParser = require("cookie-parser");
const getrouter = require("./Routes/GetRoutes");
const postrouter = require("./Routes/PostRoutes");

const app = express();
app.use(cookieParser());
app.use("/uplodes", express.static(__dirname + "/uplodes"));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json()); // Parse JSON-encoded request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
mongoose.set("strictQuery", true);
// Connect to MongoDB database using Mongoose
mongoose
  .connect("mongodb://localhost/my-database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

// Use the routes module for handling HTTP requests
app.use(getrouter);
app.use(postrouter);
app.use(routes);

// Start the server and listen for incoming requests on port 4000
app.listen(4000, () => {
  console.log("Server is running");
});
