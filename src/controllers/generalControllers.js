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

export const getDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const delivery = await Order.findByPk(id);

    if (!delivery) {
      return res.status(404).json({
        status: "error",
        message: "Delivery not found",
      });
    }

    // Check if the user is the assigned driver or an admin
    if (delivery.driverId !== user.id && user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to view this delivery",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Delivery fetched successfully",
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptRejectDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const user = req.user;

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid action. Use 'accept' or 'reject'",
      });
    }

    const delivery = await Order.findByPk(id);

    if (!delivery) {
      return res.status(404).json({
        status: "error",
        message: "Delivery not found",
      });
    }

    if (delivery.driverId !== user.id || user.role !== "driver") {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to update this delivery",
      });
    }

    if (action === "accept") {
      delivery.status = "Picked-Up";
    } else {
      delivery.status = "Pending"; // Reset to Pending for reassignment
      delivery.driverId = null; // Unassign driver
    }

    await delivery.save();
    res.status(200).json({
      status: "success",
      message: "Delivery status updated",
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, failureReason } = req.body;
    const user = req.user;

    const validStatuses = ["Picked-Up", "En-Route", "Delivered", "Failed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status. Use 'Picked-Up', 'En-Route', 'Delivered', or 'Failed'",
      });
    }

    const delivery = await Order.findByPk(id);

    if (!delivery) {
      return res.status(404).json({
        status: "error",
        message: "Delivery not found",
      });
    }

    if (delivery.driverId !== user.id || user.role !== "driver") {
      return res.status(403).json({
        status: "error",
        message: "Unauthorized to update this delivery",
      });
    }

    if (status === "Failed" && !failureReason) {
      return res.status(400).json({
        status: "error",
        message: "Failure reason is required for 'Failed' status",
      });
    }

    delivery.status = status;
    if (status === "Failed") {
      delivery.failedReason = failureReason;
    }

    await delivery.save();
    res.status(200).json({
      status: "success",
      message: "Delivery status updated",
      data: delivery,
    });
  } catch (error) {
    next(error);
  }
};