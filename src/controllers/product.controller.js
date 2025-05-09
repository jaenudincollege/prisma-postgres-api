import prisma from "../utils/prisma.js";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length < 1) {
      return res.status(404).json({
        message: "No product available, add first",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetched all products successfully",
      results: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetched product successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, description, quantity, price } = req.body;

    if (!name) {
      return res.status(422).json({
        status: "error",
        message: "Name is required",
      });
    }
    if (price == null) {
      return res.status(422).json({
        status: "error",
        message: "Price is required",
      });
    }

    const newProduct = await prisma.product.create({
      data: { name, image, description, quantity, price },
    });

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description, quantity, price } = req.body;

    const updated = await prisma.product.update({
      where: { id },
      data: { name, image, description, quantity, price },
    });

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
