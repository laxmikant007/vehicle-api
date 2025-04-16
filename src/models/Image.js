import DB from "../database/db.js";
import { Product } from "./Product.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const Image = Model.define("images", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  is_thumbnail: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  display_order: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
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

// Define relationship between Product and Image
Product.hasMany(Image, { foreignKey: 'product_id' });
Image.belongsTo(Product, { foreignKey: 'product_id' }); 