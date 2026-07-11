require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const animalRoutes = require("./routes/animalRoutes");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/animals", animalRoutes);

app.get("/", (req, res) => {
  res.send("Feather & Fur Backend is Running ");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});