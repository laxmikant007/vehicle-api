import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const User = Model.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
  },

  referral_id: {
    type: Sequelize.STRING,
  },

  referral_by: {
    type: Sequelize.STRING,
  },

  sponser_id: {
    type: Sequelize.STRING,
  },

  position: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
  },
  country: {
    type: Sequelize.STRING,
  },

  email_verified_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  password: {
    type: Sequelize.STRING,
  },

  mobile: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  mobile_verified_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },

  active_status: {
    type: Sequelize.TINYINT(1),
    defaultValue: 0,
  },
  role: {
    type: Sequelize.STRING,
    defaultValue: "2",
    comments: "1=admin, 2=user",
  },
  stake_address: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
    comments: "Default Withdrawal Address of user",
  },
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});
