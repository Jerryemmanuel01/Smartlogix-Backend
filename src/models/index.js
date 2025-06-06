// import all model
import User from "./User.js";
import Order from "./Order.js";
import sequelize from "../config/database.js";

User.hasMany(Order, { foreignKey: "driverId", as: "orders" });
Order.belongsTo(User, { foreignKey: "driverId", as: "driver" });

export { User, Order };
