import express from "express";

import VehicleController from "../../controllers/VehicalController.js";

const apiRouter = express.Router();

// Vehicle routes
apiRouter.post("/vehicle/create", VehicleController.createVehicle);
apiRouter.put("/vehicle/update", VehicleController.updateVehicle);
apiRouter.delete("/vehicle/delete/:id", VehicleController.deleteVehicle);
apiRouter.get("/vehicles", VehicleController.getAllVehicles);
apiRouter.get("/vehicle/:id", VehicleController.getVehicle);

export default apiRouter;

