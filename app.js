// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); // http logger
const cors = require("cors"); // connect the node with react
const dotenv = require("dotenv"); // loads the .env file into the process.env (environment variables)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to Database
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

// Middlewares:
// Parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny")); // HTTP request logger
app.use(cors());

// importing routers
const flight_routes = require("./routes/api/flight");
app.use("/api/flights/", flight_routes);

// Starting server
app.listen(PORT, () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});
