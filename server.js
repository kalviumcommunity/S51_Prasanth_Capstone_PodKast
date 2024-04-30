const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { startDatabase, isConnected } = require("./config/db");
const loginRouter = require("./routes/login.routes");
const { getRouter } = require("./routes/routes");
const registerRouter = require("./routes/register.routes");
const postRouter = require("./routes/post.router");
const authorizePostRouter = require("./routes/authorize.post.route");
const uploadRouter = require("./routes/media.upload.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', loginRouter);
app.use('/api', registerRouter);
app.use('/api/users', getRouter);
app.use('/api/media', postRouter);
app.use('/api', authorizePostRouter);
app.use('/api', uploadRouter);
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
