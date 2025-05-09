import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
