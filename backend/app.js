import express from "express";
import cors from "cors"
import routes from "./router/router.js";

// configuración básica
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/", routes);

export default app;
