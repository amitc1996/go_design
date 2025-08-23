import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes/index.js";
import "./config/index.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api", routes);

export default app;
