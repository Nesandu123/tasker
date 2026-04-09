const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Help-Me API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/categories", categoryRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/uploads", express.static("uploads")); //serve images

app.use("/api/auth", authRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api/services", serviceRoutes);

const User = require("./models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created");
  }
};

createAdmin();