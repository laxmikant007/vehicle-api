import express from "express";
import apiRouter from "./src/routes/v1/api.js";
import response from "./src/helpers/response.js";
import corsMiddleware from "./src/middleware/cors.js";
import model from "./src/models/model.js";
import swagger from "./src/docs/swagger.js";
import seedProducts from "./src/seeders/fixedProductSeeder.js";

import helmet from "helmet";
import productRouter from "./src/routes/v1/productsApi.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet()); 


app.use(express.json({ limit: '100mb' })); 

app.use(express.urlencoded({ extended: true, limit: '100mb' }));

corsMiddleware(app);

app.use(response);

app.get("/", (req, res) => res.json({ status: true, message: "use /api-docs to access swagger documentation" }));

// Swagger documentation route
app.use("/api-docs", swagger.serve, swagger.setup);

app.use("/api", apiRouter);

app.use("/products", productRouter);

// Run the seeder
(async () => {
  try {
    await seedProducts();
  } catch (err) {
    console.error("Error running seeder:", err);
  }
})();


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
