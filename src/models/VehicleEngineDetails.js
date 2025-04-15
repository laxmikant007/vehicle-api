import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const VehicleEngineDetails = Model.define("vehicle_engine_details", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  vehicle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  engine_type: {
    type: Sequelize.ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'),
    allowNull: false,
  },
  displacement: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    comment: "Engine displacement in cc"
  },
  cylinders: {
    type: Sequelize.INTEGER,
    allowNull: true,
    comment: "Number of cylinders (null for electric vehicles)"
  },
  power: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "Engine power in BHP/kW"
  },
  torque: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "Engine torque in Nm"
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 