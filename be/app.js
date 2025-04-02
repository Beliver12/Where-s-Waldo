const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const routes = require("./routes");

const prisma = new PrismaClient();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/leaderBoard", routes.leaderBoard);
app.use("/image", routes.image);
app.use("/cordinates", routes.cordinates);

app.listen(process.env.PORT, () => {
  console.log(`My first Express app - listening on port ${process.env.PORT}!`);
});
