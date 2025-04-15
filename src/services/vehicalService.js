import config from "../config/config.js";
import model from "../models/model.js";
import { Op } from "sequelize";

async function createVehicle(request) {
  try {
    // Transaction to ensure all related entities are created together
    const result = await model.Vehicle.sequelize.transaction(async (t) => {
      // Create company if not exists
      const [company] = await model.VehicleCompany.findOrCreate({
        where: { company_name: request.company.company_name },
        defaults: {
          company_country: request.company.company_country,
          founded_in: request.company.founded_in,
          networth: request.company.networth
        },
        transaction: t
      });

      // Create vehicle model
      const [vehicleModel] = await model.VehicleModel.findOrCreate({
        where: { 
          model_name: request.vehicle_model.model_name,
          company_id: company.id
        },
        defaults: {
          year: request.vehicle_model.year,
          vehicle_type: request.vehicle_model.vehicle_type,
          seating_capacity: request.vehicle_model.seating_capacity,
          company_id: company.id
        },
        transaction: t
      });

      // Create main vehicle
      const vehicle = await model.Vehicle.create({
        model_id: vehicleModel.id,
        registration_number: request.registration_number,
        color: request.color,
        manufacture_date: request.manufacture_date,
        is_active: true
      }, { transaction: t });

      // Create vehicle stats
      await model.VehicleStats.create({
        vehicle_id: vehicle.id,
        kilometers_run: request.stats.kilometers_run,
        top_speed: request.stats.top_speed,
        mileage: request.stats.mileage,
        fuel_efficiency: request.stats.fuel_efficiency,
        drive_type: request.stats.drive_type
      }, { transaction: t });

      // Create vehicle owner info
      await model.VehicleOwnerInfo.create({
        vehicle_id: vehicle.id,
        owner_name: request.owner.owner_name,
        owner_contact: request.owner.owner_contact,
        owner_address: request.owner.owner_address,
        purchase_date: request.owner.purchase_date,
        is_primary_owner: request.owner.is_primary_owner || true
      }, { transaction: t });

      // Create vehicle engine details
      await model.VehicleEngineDetails.create({
        vehicle_id: vehicle.id,
        engine_type: request.engine.engine_type,
        displacement: request.engine.displacement,
        cylinders: request.engine.cylinders,
        power: request.engine.power,
        torque: request.engine.torque
      }, { transaction: t });

      return vehicle;
    });

    return { 
      status: true, 
      message: "Vehicle added successfully", 
      data: {
        id: result.id,
        registration_number: result.registration_number
      }
    };
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return { status: false, message: "Failed to add vehicle" };
  }
}

async function updateVehicle(request) {
  try {
    const vehicleId = request.id;
    
    // Check if vehicle exists
    const vehicle = await model.Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return { status: false, message: "Vehicle not found" };
    }

    // Transaction to ensure all related entities are updated together
    await model.Vehicle.sequelize.transaction(async (t) => {
      // Update main vehicle
      if (request.registration_number || request.color || request.manufacture_date || request.is_active !== undefined) {
        await vehicle.update({
          registration_number: request.registration_number || vehicle.registration_number,
          color: request.color || vehicle.color,
          manufacture_date: request.manufacture_date || vehicle.manufacture_date,
          is_active: request.is_active !== undefined ? request.is_active : vehicle.is_active
        }, { transaction: t });
      }

      // Update vehicle stats if provided
      if (request.stats) {
        const stats = await model.VehicleStats.findOne({ where: { vehicle_id: vehicleId } });
        if (stats) {
          await stats.update({
            kilometers_run: request.stats.kilometers_run !== undefined ? request.stats.kilometers_run : stats.kilometers_run,
            top_speed: request.stats.top_speed !== undefined ? request.stats.top_speed : stats.top_speed,
            mileage: request.stats.mileage !== undefined ? request.stats.mileage : stats.mileage,
            fuel_efficiency: request.stats.fuel_efficiency !== undefined ? request.stats.fuel_efficiency : stats.fuel_efficiency,
            drive_type: request.stats.drive_type || stats.drive_type
          }, { transaction: t });
        }
      }

      // Update vehicle owner info if provided
      if (request.owner) {
        const owner = await model.VehicleOwnerInfo.findOne({ where: { vehicle_id: vehicleId } });
        if (owner) {
          await owner.update({
            owner_name: request.owner.owner_name || owner.owner_name,
            owner_contact: request.owner.owner_contact || owner.owner_contact,
            owner_address: request.owner.owner_address || owner.owner_address,
            purchase_date: request.owner.purchase_date || owner.purchase_date,
            is_primary_owner: request.owner.is_primary_owner !== undefined ? request.owner.is_primary_owner : owner.is_primary_owner
          }, { transaction: t });
        }
      }

      // Update vehicle engine details if provided
      if (request.engine) {
        const engine = await model.VehicleEngineDetails.findOne({ where: { vehicle_id: vehicleId } });
        if (engine) {
          await engine.update({
            engine_type: request.engine.engine_type || engine.engine_type,
            displacement: request.engine.displacement !== undefined ? request.engine.displacement : engine.displacement,
            cylinders: request.engine.cylinders !== undefined ? request.engine.cylinders : engine.cylinders,
            power: request.engine.power !== undefined ? request.engine.power : engine.power,
            torque: request.engine.torque !== undefined ? request.engine.torque : engine.torque
          }, { transaction: t });
        }
      }
    });

    return { status: true, message: "Vehicle updated successfully" };
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return { status: false, message: "Failed to update vehicle" };
  }
}

async function deleteVehicle(request) {
  try {
    const vehicleId = request.id;
    
    // Check if vehicle exists
    const vehicle = await model.Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return { status: false, message: "Vehicle not found" };
    }

    // Transaction to ensure all related entities are deleted together
    await model.Vehicle.sequelize.transaction(async (t) => {
      // Delete vehicle stats
      await model.VehicleStats.destroy({
        where: { vehicle_id: vehicleId },
        transaction: t
      });

      // Delete vehicle owner info
      await model.VehicleOwnerInfo.destroy({
        where: { vehicle_id: vehicleId },
        transaction: t
      });

      // Delete vehicle engine details
      await model.VehicleEngineDetails.destroy({
        where: { vehicle_id: vehicleId },
        transaction: t
      });

      // Delete main vehicle
      await vehicle.destroy({ transaction: t });
    });

    return { status: true, message: "Vehicle deleted successfully" };
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return { status: false, message: "Failed to delete vehicle" };
  }
}

async function getAllVehicles() {
  try {
    const vehicles = await model.Vehicle.findAll({
      include: [
        {
          model: model.VehicleModel,
          include: [{
            model: model.VehicleCompany
          }]
        },
        {
          model: model.VehicleStats
        },
        {
          model: model.VehicleOwnerInfo
        },
        {
          model: model.VehicleEngineDetails
        }
      ]
    });

    return { 
      status: true, 
      message: "Vehicles retrieved successfully", 
      data: vehicles 
    };
  } catch (error) {
    console.error("Error retrieving vehicles:", error);
    return { status: false, message: "Failed to retrieve vehicles" };
  }
}

async function getVehicle(request) {
  try {

    console.log("this is request", request)
    
    const vehicleId = parseInt(request.id, 10);

    console.log("this is vehical", vehicleId)
    
    if (isNaN(vehicleId)) {
      return { status: false, message: "Invalid vehicle ID" };
    }
    
    const vehicle = await model.Vehicle.findByPk(vehicleId, {
      include: [
        {
          model: model.VehicleModel,
          include: [{
            model: model.VehicleCompany
          }]
        },
        {
          model: model.VehicleStats
        },
        {
          model: model.VehicleOwnerInfo
        },
        {
          model: model.VehicleEngineDetails
        }
      ]
    });

    if (!vehicle) {
      return { status: false, message: "Vehicle not found" };
    }

    return { 
      status: true, 
      message: "Vehicle retrieved successfully", 
      data: vehicle 
    };
  } catch (error) {
    console.error("Error retrieving vehicle:", error);
    return { status: false, message: "Failed to retrieve vehicle" };
  }
}

export default {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicle
};