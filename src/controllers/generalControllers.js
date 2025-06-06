import { Order, User } from "../models/index.js";

export const getProfile = async (req, res, next) => {
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(401).json({
        status: "error",
        message: "Token error! please try logging in again",
      });
    }

    const existingDriver = await User.findOne({
      where: { email },
      include: [{ model: Order, as: "orders" }],
    });

    if (!existingDriver) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const { orders, ...userData } = existingDriver.toJSON();

    return res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: userData,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
