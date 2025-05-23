import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

export const validateTokenProvided = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization || "";

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    next();
  });
};
