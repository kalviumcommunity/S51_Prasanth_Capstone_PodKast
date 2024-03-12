const express = require("express");
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000

app.get("/", (res, req) => {
  req.send({ message: "Hello World!" });
});

app.listen(port, async () => {
  console.log(`🚀 server running on PORT: ${port}`);
});
