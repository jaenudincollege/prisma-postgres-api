import express from "express";
import productRoutes from "./routes/product.routes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
