import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            email,
          },
        ],
      },
    });

    if (user) {
      return res.status(409).json({
        status: "fail",
        message: "Username or Email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashPassword, role },
    });

    return res.status(201).json({
      status: "success",
      message: "Register successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Error",
      error,
    });
  }
};
