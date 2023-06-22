const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;

require("./src/db/mongoose");

const {
  checkIfUserExists,
  validateBody,
} = require("./middleware/usersMiddleware");
const usersRoutes = require("./routes/usersRoutes");
const petsRoutes = require("./routes/petsRoutes");

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/users", usersRoutes);
app.use("/pets", petsRoutes);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
