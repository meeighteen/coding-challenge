import express from "express";
import { generateAuthToken } from "../controllers/authController";
import { validateTokenRequest } from "../middlewares/validations/validateTokenRequest";
import { hashPasswordMiddleware } from "../middlewares/auth/hashPassword";

const router = express.Router();

/**
 * @swagger
 * /api/public/token:
 *  post:
 *    summary: Generar token
 *    description: Obtiene un token JWT si las credenciales son correctas.
 *    tags: [Autenticacion]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - password
 *             properties:
 *                email:
 *                    type: string
 *                    format: email
 *                    example: usuario123@mail.com
 *                password:
 *                    type: string
 *                    example: password123
 *    responses:
 *      200:
 *          description: Autenticacion exitosa.
 *      400:
 *          description: Error de validación.
 *          content:
 *              application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                     errors:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                             type:
 *                                 type: string
 *                             msg:
 *                                 type: string
 *                             path:
 *                                 type: string
 *                             location:
 *                                 type: string
 *                  example:
 *                     errors:
 *                         - type: field
 *                           msg: "El campo email es requerido"
 *                           path: email
 *                           location: body
 *                         - type: field
 *                           msg: "La contraseña es requerida"
 *                           path: password
 *                           location: body
 *      401:
 *          description: Credenciales incorrectas.
 *
 */

router.post(
  "/login",
  validateTokenRequest,
  generateAuthToken
);
export default router;
