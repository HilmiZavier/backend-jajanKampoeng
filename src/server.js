require("dotenv").config();
const express = require("express");
const app = express();
const PORT = Number(process.env.PORT) || 5000;
const path = require("path");

app.use(express.json());

app.use(
  "/assets/images",
  express.static(path.join(__dirname, "public/images"))
);
const conn = require("./routes/conn");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

app.use("/", conn);
app.use("/", authRoute);
app.use("/", userRoute);

app.get("/", (_req, res) => {
  res.json({
    res: "ok",
    message: "Welcome to my api",
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
