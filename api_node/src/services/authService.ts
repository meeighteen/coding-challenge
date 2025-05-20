import "dotenv/config";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecreto123";
const EXPIRES_IN: any = process.env.JWT_EXPIRES_IN || "1h";

/**
 * Genera un token JWT a partir del ID de usuario
 * @param userId - ID del usuario
 * @returns token JWT
 */
export const generateToken = (userId: string) => {
  const options: SignOptions = {
    expiresIn: EXPIRES_IN,
  };
  return jwt.sign({ userId }, SECRET_KEY, options);
};

/**
 * Compara una contraseña en texto plano contra un hash
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>}
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
