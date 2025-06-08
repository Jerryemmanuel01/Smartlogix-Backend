import { Order, User } from "../models/index.js";

export const createDelivery = async (req, res, next) => {
  try {
    const { receiverName, address, phone, description, driverId } = req.body;

    const existingDriver = await User.findByPk(driverId);

    if (!existingDriver) {
      return res.status(404).json({
        status: "error",
        message: "Driver not found!",
      });
    }

    const newOrder = Order.create({
      receiverName,
      address,
      phone,
      description,
      driverId,
    });

    if (!newOrder) {
      return res.status(400).json({
        status: "error",
        message: "Error creating order! Please try again",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Order created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const { status } = req.query;

    const allOrder = await Order.findAll({
      where: status ? { status } : undefined,
    });

    if (!allOrder) {
      return res
        .status(400)
        .json({ status: "error", message: "Error getting orders" });
    }

    return res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      data: allOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getDrivers = async (req, res, next) => {
  try {
    const drivers = await User.findAll({
      where: { role: "driver" },
      include: [{ model: Order, as: "orders" }],
    });

    if (!drivers) {
      return res
        .status(400)
        .json({ status: "error", message: "Error getting drivers" });
    }

    return res.status(200).json({
      status: "success",
      message: "Drivers fetched successfully",
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

export const getDriverById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const driver = await User.findByPk(id, {
      include: [{ model: Order, as: "orders" }],
    });

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver not found!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Driver fetched successfully",
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDriver = async (req, res, next) => {
  try {
    const { id } = req.params;

    const driver = await User.findByPk(id);

    if (!driver) {
      return res.status(404).json({
        status: "error",
        message: "Driver not found!",
      });
    }

    await driver.destroy();

    return res.status(200).json({
      status: "success",
      message: "Driver deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
