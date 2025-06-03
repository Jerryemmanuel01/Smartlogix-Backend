// import all model
import User from "./User.js";
import Order from "./Order.js";
import sequelize from "../config/database.js";

User.hasMany(Order, { foreignKey: "userId", });
Order.belongsTo(User, { foreignKey: "userId" });

export { User, Order };
