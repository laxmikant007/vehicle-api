import express from "express";
import apiRouter from "./src/routes/v1/api.js";
import response from "./src/helpers/response.js";
import corsMiddleware from "./src/middleware/cors.js";
import model from "./src/models/model.js";
import swagger from "./src/docs/swagger.js";

import helmet from "helmet";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet()); 


app.use(express.json({ limit: '100mb' })); 

app.use(express.urlencoded({ extended: true, limit: '100mb' }));

corsMiddleware(app);

app.use(response);

app.get("/", (req, res) => res.json({ status: true }));

// Swagger documentation route
app.use("/api-docs", swagger.serve, swagger.setup);

app.use("/api", apiRouter);


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
