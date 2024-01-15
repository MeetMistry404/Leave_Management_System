require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const router = require("./Router/user_router");
const leaveRouter = require("./Router/leave_router");
const connectDB = require("./Utils/db");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/user", router);
app.use("/leaves", leaveRouter);

connectDB().then(
  app.listen(port, () => {
    console.log(`server running successfully on http://localhost:${port}`);
  })
);
