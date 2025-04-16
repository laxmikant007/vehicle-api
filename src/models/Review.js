import DB from "../database/db.js";
import { Product } from "./Product.js";

let Sequelize = DB.Sequelize;
let Model = DB.SModel;

export const Review = Model.define("reviews", {
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
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  reviewer_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reviewer_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
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

// Define the relationship between Product and Review
Product.hasMany(Review, { foreignKey: 'product_id' });
Review.belongsTo(Product, { foreignKey: 'product_id' }); 