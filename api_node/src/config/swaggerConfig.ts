import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API para Operaciones de Matrices en Node JS con Typescript",
      version: "1.0.0",
      description: "Documentación de la API REST con Swagger y TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3009",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ruta a los archivos donde documentas los endpoints
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
