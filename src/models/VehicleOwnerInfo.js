import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const VehicleOwnerInfo = Model.define("vehicle_owner_infos", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  vehicle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  owner_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner_contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  owner_address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  purchase_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  is_primary_owner: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    comment: "Whether this is the first owner of the vehicle"
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 