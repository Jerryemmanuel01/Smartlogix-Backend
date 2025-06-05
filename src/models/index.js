// import all model
import User from "./User.js";
import Order from "./Order.js";
import sequelize from "../config/database.js";

User.hasMany(Order, { foreignKey: "driverId" });
Order.belongsTo(User, { foreignKey: "driverId" });

export { User, Order };
