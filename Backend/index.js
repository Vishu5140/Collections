import express from "express";
import DataBase from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://collections-frontend-hoks.onrender.com",
  })
);

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/order", orderRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await DataBase();

    app.listen(PORT, () => {
      console.log(`server running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server not started because MongoDB connection failed");
  }
};

startServer();