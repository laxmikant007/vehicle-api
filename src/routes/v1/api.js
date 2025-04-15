import express from "express";

import VehicleController from "../../controllers/VehicalController.js";

const apiRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Vehicles
 *     description: Vehicle management
 */

/**
 * @swagger
 * /vehicle/create:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model_id
 *               - registration_number
 *               - color
 *               - manufacture_date
 *               - company
 *               - stats
 *               - owner
 *               - vehicle_model
 *               - engine
 *             properties:
 *               model_id:
 *                 type: integer
 *               registration_number:
 *                 type: string
 *               color:
 *                 type: string
 *               manufacture_date:
 *                 type: string
 *                 format: date
 *               company:
 *                 type: object
 *                 required:
 *                   - company_name
 *                   - company_country
 *                   - founded_in
 *                   - networth
 *                 properties:
 *                   company_name:
 *                     type: string
 *                   company_country:
 *                     type: string
 *                   founded_in:
 *                     type: integer
 *                   networth:
 *                     type: number
 *               stats:
 *                 type: object
 *                 required:
 *                   - kilometers_run
 *                   - top_speed
 *                   - mileage
 *                   - fuel_efficiency
 *                   - drive_type
 *                 properties:
 *                   kilometers_run:
 *                     type: number
 *                   top_speed:
 *                     type: integer
 *                   mileage:
 *                     type: number
 *                   fuel_efficiency:
 *                     type: number
 *                   drive_type:
 *                     type: string
 *                     enum: [4x4, 2x2, FWD, RWD, AWD]
 *               owner:
 *                 type: object
 *                 required:
 *                   - owner_name
 *                   - owner_contact
 *                   - owner_address
 *                   - purchase_date
 *                 properties:
 *                   owner_name:
 *                     type: string
 *                   owner_contact:
 *                     type: string
 *                   owner_address:
 *                     type: string
 *                   purchase_date:
 *                     type: string
 *                     format: date
 *                   is_primary_owner:
 *                     type: boolean
 *               vehicle_model:
 *                 type: object
 *                 required:
 *                   - model_name
 *                   - year
 *                   - vehicle_type
 *                   - seating_capacity
 *                 properties:
 *                   model_name:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   vehicle_type:
 *                     type: string
 *                     enum: [SUV, Sedan, Hatchback, Truck, Van, Luxury, BIKE]
 *                   seating_capacity:
 *                     type: integer
 *               engine:
 *                 type: object
 *                 required:
 *                   - engine_type
 *                   - displacement
 *                   - power
 *                   - torque
 *                 properties:
 *                   engine_type:
 *                     type: string
 *                     enum: [Petrol, Diesel, Electric, Hybrid, CNG]
 *                   displacement:
 *                     type: number
 *                   cylinders:
 *                     type: integer
 *                   power:
 *                     type: integer
 *                   torque:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /vehicle/update:
 *   put:
 *     summary: Update vehicle details
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *               color:
 *                 type: string
 *               manufacture_date:
 *                 type: string
 *                 format: date
 *               is_active:
 *                 type: boolean
 *               stats:
 *                 type: object
 *                 properties:
 *                   kilometers_run:
 *                     type: number
 *                   top_speed:
 *                     type: integer
 *                   mileage:
 *                     type: number
 *                   fuel_efficiency:
 *                     type: number
 *                   drive_type:
 *                     type: string
 *                     enum: [4x4, 2x2, FWD, RWD, AWD]
 *               owner:
 *                 type: object
 *                 properties:
 *                   owner_name:
 *                     type: string
 *                   owner_contact:
 *                     type: string
 *                   owner_address:
 *                     type: string
 *                   purchase_date:
 *                     type: string
 *                     format: date
 *                   is_primary_owner:
 *                     type: boolean
 *               engine:
 *                 type: object
 *                 properties:
 *                   engine_type:
 *                     type: string
 *                     enum: [Petrol, Diesel, Electric, Hybrid, CNG]
 *                   displacement:
 *                     type: number
 *                   cylinders:
 *                     type: integer
 *                   power:
 *                     type: integer
 *                   torque:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * /vehicle/delete/{id}:
 *   delete:
 *     summary: Delete a vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *       404:
 *         description: Vehicle not found
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of all vehicles
 */

/**
 * @swagger
 * /vehicle/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle details
 *       404:
 *         description: Vehicle not found
 */

// Vehicle routes
apiRouter.post("/vehicle/create", VehicleController.createVehicle);
apiRouter.put("/vehicle/update", VehicleController.updateVehicle);
apiRouter.delete("/vehicle/delete/:id", VehicleController.deleteVehicle);
apiRouter.get("/vehicles", VehicleController.getAllVehicles);
apiRouter.get("/vehicle/:id", VehicleController.getVehicle);

export default apiRouter;

