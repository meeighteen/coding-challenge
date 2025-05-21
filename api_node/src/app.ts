import express from "express";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";
import { setupSwagger } from "./config/swaggerConfig";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

const app_local = process.env.APP_VUE_LOCAL;
const app_prod = process.env.APP_VUE_PROD;

const allowedOrigins = [app_local, app_prod];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send(
    "Hello, greetings from the API with Node.js, Log first before trying to POST private API routes"
  );
});

app.use("/api/public", publicRoutes);

app.use("/api/private", privateRoutes);

setupSwagger(app);

export default app;
