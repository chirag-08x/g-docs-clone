const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const userRouter = require("./routes/userRoutes");
const docRouter = require("./routes/docRoutes");
const db = require("./database/db");
const cors = require("cors");

const app = express();
app.use(cors());
db();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/docs", docRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server runing on PORT ${PORT}`);
});
