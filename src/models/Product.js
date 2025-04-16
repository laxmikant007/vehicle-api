import DB from "../database/db.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const Product = Model.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discountPercentage: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sku: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  dimensions: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  warrantyInformation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  shippingInformation: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  availabilityStatus: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "In Stock",
  },
  returnPolicy: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  minimumOrderQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  meta: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: true,
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