import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const VehicleStats = Model.define("vehicle_stats", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  vehicle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kilometers_run: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    comment: "Total kilometers run by the vehicle"
  },
  top_speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "Top speed in km/h"
  },
  mileage: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    comment: "Mileage in km/l or km/kg"
  },
  fuel_efficiency: {
    type: Sequelize.DECIMAL(6, 2),
    allowNull: false,
    comment: "Fuel efficiency rating"
  },
  drive_type: {
    type: Sequelize.ENUM('4x4', '2x2', 'FWD', 'RWD', 'AWD'),
    allowNull: false,
    comment: "Vehicle drive type (4x4, 2x2, Front Wheel Drive, Rear Wheel Drive, All Wheel Drive)"
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 