const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

dotenv.config();
console.log("jwt secretekey", process.env.JWT_SECRET); // Check if the JWT_SECRET is loaded

connectDb();

const app = express();
//MiddleWares
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;
//Routes
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
