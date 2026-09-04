
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const dns = require("dns");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const productRoutes = require("./routes/productRoutes");
const publicRoutes = require("./routes/publicRoutes");
const orderRoutes = require("./routes/orderRoutes");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories",authMiddleware,roleMiddleware("admin"), categoryRoutes);
app.use("/api/products",authMiddleware,roleMiddleware("admin"), productRoutes);
app.use("/api/orders", orderRoutes);

//public routes
app.use("/api/public", publicRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
