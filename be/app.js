const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");

// Only set up CORS once
const allowedOrigins = [
  'https://where-s-waldo-tau.vercel.app',
  'https://where-s-waldo-380sj663c-beliver12s-projects.vercel.app',
];

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;




const corsOptions = {
  origin: 'https://where-s-waldo-tau.vercel.app', // Allow requests from your frontend
  methods: 'GET', // Allow GET requests
  origin: function (origin, callback) {
    if (!origin) {
      console.log("CORS: No origin (maybe server-to-server request)");
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      console.log(`CORS: Allowing origin ${origin}`);
      return callback(null, true);
    } else {
      console.error(`CORS: Blocked origin ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/leaderBoard", routes.leaderBoard);
app.use("/image", routes.image);
app.use("/cordinates", routes.cordinates);

app.listen(process.env.PORT, () => {
  console.log(`My first Express app - listening on port ${process.env.PORT}!`);
});
