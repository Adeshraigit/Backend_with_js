import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)

// common middlewares
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb", extended: true, }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes
import { healthcheck } from "./controllers/healthcheck.controllers.js";

// routes
app.use("/api/v1/healthcheck", healthcheck);


export { app };