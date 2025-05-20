import { NextFunction, Request, Response } from "express";
import { validationResult, check } from "express-validator";

export const validateTokenRequest = [
  check("email")
    .notEmpty()
    .withMessage("El campo email es requerido")
    .isEmail()
    .withMessage("El campo email no es un email válido"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];
