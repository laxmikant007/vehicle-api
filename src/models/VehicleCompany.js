import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const VehicleCompany = Model.define("vehicle_companies", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  company_country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  founded_in: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: "Year when the company was founded"
  },
  networth: {
    type: Sequelize.DECIMAL(15, 2),
    allowNull: false,
    comment: "Company networth in millions"
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 