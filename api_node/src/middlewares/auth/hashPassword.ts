import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

export async function hashPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const password = req.body.password;

    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    res.status(400).json({ error: "Error at encryption." });
    return;
  }
}
