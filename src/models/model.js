import { Vehicle } from "./Vehicle.js";
import { VehicleCompany } from "./VehicleCompany.js";
import { VehicleStats } from "./VehicleStats.js";
import { VehicleOwnerInfo } from "./VehicleOwnerInfo.js";
import { VehicleModel } from "./VehicleModel.js";
import { VehicleEngineDetails } from "./VehicleEngineDetails.js";
import { Product } from "./Product.js";
import { Image } from "./Image.js";

// Sync all models with database
await VehicleCompany.sync();
await VehicleModel.sync();
await Vehicle.sync();
await VehicleStats.sync();
await VehicleOwnerInfo.sync();
await VehicleEngineDetails.sync();
await Product.sync();
await Image.sync();

// Define relationships

// Company has many models
VehicleCompany.hasMany(VehicleModel, { foreignKey: "company_id" });
VehicleModel.belongsTo(VehicleCompany, { foreignKey: "company_id" });

// Model has many vehicles
VehicleModel.hasMany(Vehicle, { foreignKey: "model_id" });
Vehicle.belongsTo(VehicleModel, { foreignKey: "model_id" });

// Vehicle has one stats, one engine details, and many owner infos
Vehicle.hasOne(VehicleStats, { foreignKey: "vehicle_id" });
VehicleStats.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

Vehicle.hasOne(VehicleEngineDetails, { foreignKey: "vehicle_id" });
VehicleEngineDetails.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

Vehicle.hasMany(VehicleOwnerInfo, { foreignKey: "vehicle_id" });
VehicleOwnerInfo.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

// Product has many images
Product.hasMany(Image, { foreignKey: "product_id" });
Image.belongsTo(Product, { foreignKey: "product_id" });

export default {
  Vehicle,
  VehicleCompany,
  VehicleStats,
  VehicleOwnerInfo,
  VehicleModel,
  VehicleEngineDetails,
  Product,
  Image
};
