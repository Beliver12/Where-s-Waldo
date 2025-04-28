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

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

const allowedOrigins = [
  'https://where-s-waldo-tau.vercel.app',
  'https://where-s-waldo-380sj663c-beliver12s-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(
  cors({
    origin: "https://where-s-waldo-tau.vercel.app",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use("/leaderBoard", routes.leaderBoard);
app.use("/image", routes.image);
app.use("/cordinates", routes.cordinates);

app.listen(process.env.PORT, () => {
  console.log(`My first Express app - listening on port ${process.env.PORT}!`);
});
