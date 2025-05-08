export const createProduct = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({
      message: "Error please try again",
      error: error.message,
    });
  }
};
