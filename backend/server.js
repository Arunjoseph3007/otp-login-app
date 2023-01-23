require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRouter = require("./router/user.router");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json(`Server running on port ${port}`);
});

connectDB().then(() =>
  app.listen(port, () => console.log("Server started..."))
);
