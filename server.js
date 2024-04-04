const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { startDatabase, isConnected } = require("./config/db");
const { getRouter } = require('./routes/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api", getRouter);
app.use(cors());

app.get("/", (req, res) => {
  const databaseStatus = isConnected() ? "connected" : "disconnected";
  const message = isConnected()
    ? "Welcome to PodKast! Your podcast social media platform is up and running smoothly."
    : `Oops! It seems like there's an issue with the database connection. We're working to resolve it as soon as possible. Please check back later.`;

  res.json({
    message: message,
    database: databaseStatus,
  });
});

// Start the server
app.listen(port, async () => {
  await startDatabase();
  console.log(`🚀 Server running on PORT: ${port}`);
});
