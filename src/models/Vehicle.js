import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const Vehicle = Model.define("vehicles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  model_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  registration_number: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  manufacture_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
}); 