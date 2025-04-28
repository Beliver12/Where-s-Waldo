const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

// Apply CORS middleware
app.use(cors({
  origin: 'https://where-s-waldo-tau.vercel.app', // Allow only the Vercel frontend
  credentials: true // If you're sending cookies or authentication data
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/leaderBoard", routes.leaderBoard);
app.use("/image", routes.image);
app.use("/cordinates", routes.cordinates);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`My first Express app - listening on port ${process.env.PORT}!`);
});
