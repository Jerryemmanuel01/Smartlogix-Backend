import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accept: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      "Pending",
      "Picked-Up",
      "En-Route",
      "Delivered",
      "Failed"
    ),
    defaultValue: "Pending",
  },
  failedReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Order;
