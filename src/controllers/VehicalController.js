import vehicalValidate from "../validate/vehicalValidate.js";
import vehicalService from "../services/vehicalService.js";

async function createVehicle(req, res) {
  let request = req.body;

  // Validate request
  let isValid = await vehicalValidate.validateCreateVehicle(request);

  if (!isValid.status) { return res.failed(isValid.message)}

  // Create vehicle
  let vehicle = await vehicalService.createVehicle(request);

  if (!vehicle.status) { return res.failed(vehicle.message)}

  return res.success("Vehicle created successfully", vehicle.data);
}

async function updateVehicle(req, res) {
  let request = req.body;

  // Validate request
  let isValid = await vehicalValidate.validateUpdateVehicle(request);


  if (!isValid.status) {return res.failed(isValid.message)}

  // Update vehicle
  let vehicle = await vehicalService.updateVehicle(request);

  if (!vehicle.status) {return res.failed(vehicle.message)}

  return res.success("Vehicle updated successfully");
}

async function deleteVehicle(req, res) {
  let request = req.params;
  
  // Validate request
  let isValid = await vehicalValidate.validateDeleteVehicle(request);

  if (!isValid.status) {return res.failed(isValid.message)}

  // Delete vehicle
  let vehicle = await vehicalService.deleteVehicle(request);

  if (!vehicle.status) {return res.failed(vehicle.message)}

  return res.success("Vehicle deleted successfully");
}

async function getAllVehicles(req, res) {
  // Get all vehicles
  let vehicles = await vehicalService.getAllVehicles();

  if (!vehicles.status) {return res.failed(vehicles.message)}

  return res.success("Vehicles retrieved successfully", vehicles.data);
}

async function getVehicle(req, res) {
  // Get request parameters
  let request = { id: parseInt(req.params.id) };
  
  // Validate request
  let isValid = await vehicalValidate.validateGetVehicle(request);

  if (!isValid.status) {return res.failed(isValid.message)}

  // Get vehicle
  let vehicle = await vehicalService.getVehicle(request);

  if (!vehicle.status) {return res.failed(vehicle.message)}

  return res.success("Vehicle retrieved successfully", vehicle.data);
}

export default {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicle
};
