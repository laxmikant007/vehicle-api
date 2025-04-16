import DB from "../database/db.js";
import { Product } from "./Product.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const Tag = Model.define("tags", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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

export const ProductTag = Model.define("product_tags", {
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
  tag_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Tag,
      key: 'id'
    }
  }
}, {
  underscored: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

// Define the many-to-many relationship between Product and Tag
Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'product_id' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tag_id' }); 