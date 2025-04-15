import validate from "./CValidator.js";

async function validateCreateVehicle(request) {
  let { status, message } = await validate(request, {
    model_id: "required|integer",
    registration_number: "required|string",
    color: "required|string",
    manufacture_date: "required|date",
    
    // Company details
    company: "required|object",
    "company.company_name": "required|string",
    "company.company_country": "required|string",
    "company.founded_in": "required|integer",
    "company.networth": "required|numeric",
    
    // Stats details
    stats: "required|object",
    "stats.kilometers_run": "required|numeric",
    "stats.top_speed": "required|integer",
    "stats.mileage": "required|numeric",
    "stats.fuel_efficiency": "required|numeric",
    "stats.drive_type": "required|string|in:4x4,2x2,FWD,RWD,AWD",
    
    // Owner details
    owner: "required|object",
    "owner.owner_name": "required|string",
    "owner.owner_contact": "required|string",
    "owner.owner_address": "required|string",
    "owner.purchase_date": "required|date",
    "owner.is_primary_owner": "boolean",
    
    // Model details
    vehicle_model: "required|object",
    "vehicle_model.model_name": "required|string",
    "vehicle_model.year": "required|integer",
    "vehicle_model.vehicle_type": "required|string|in:SUV,Sedan,Hatchback,Truck,Van,Luxury,BIKE",
    "vehicle_model.seating_capacity": "required|integer",
    
    // Engine details
    engine: "required|object",
    "engine.engine_type": "required|string|in:Petrol,Diesel,Electric,Hybrid,CNG",
    "engine.displacement": "required|numeric",
    "engine.cylinders": "integer",
    "engine.power": "required|integer",
    "engine.torque": "required|integer"
  });

  return { status, message };
}

async function validateUpdateVehicle(request) {
  let { status, message } = await validate(request, {
    id: "required|integer",
    color: "string",
    manufacture_date: "date",
    is_active: "boolean",
    
    // Stats details
    stats: "object",
    "stats.kilometers_run": "numeric",
    "stats.top_speed": "integer",
    "stats.mileage": "numeric",
    "stats.fuel_efficiency": "numeric",
    "stats.drive_type": "string|in:4x4,2x2,FWD,RWD,AWD",
    
    // Owner details
    owner: "object",
    "owner.owner_name": "string",
    "owner.owner_contact": "string",
    "owner.owner_address": "string",
    "owner.purchase_date": "date",
    "owner.is_primary_owner": "boolean",
    
    // Engine details
    engine: "object",
    "engine.engine_type": "string|in:Petrol,Diesel,Electric,Hybrid,CNG",
    "engine.displacement": "numeric",
    "engine.cylinders": "integer",
    "engine.power": "integer",
    "engine.torque": "integer"
  });

  return { status, message };
}

async function validateDeleteVehicle(request) {
  let { status, message } = await validate(request, {
    id: "required|integer|exists:vehicles,id"
  });

  return { status, message };
}

async function validateGetVehicle(request) {
  let { status, message } = await validate(request, {
    id: "required|integer|exists:vehicles,id"
  });

  return { status, message };
}

export default {
  validateCreateVehicle,
  validateUpdateVehicle,
  validateDeleteVehicle,
  validateGetVehicle
};
