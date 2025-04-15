import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const VehicleModel = Model.define("vehicle_models", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  model_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "Manufacturing year"
  },
  vehicle_type: {
    type: Sequelize.ENUM('SUV', 'Sedan', 'Hatchback', 'Truck', 'Van', 'Luxury'),
    allowNull: false,
  },
  seating_capacity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 