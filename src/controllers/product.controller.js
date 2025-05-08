import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  try {
    const { name, image, description, quantity, price } = req.body;

    if (!name) {
      return res.status(422).json({ message: "Name is required" });
    }
    if (!price) {
      return res.status(422).json({ message: "Name is required" });
    }
    const newProduct = await prisma.product.create({
      data: { name, image, description, quantity, price },
    });

    return res.status(201).json({
      status: "success",
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({
      message: "Error please try again",
      error: error.message,
    });
  }
};
