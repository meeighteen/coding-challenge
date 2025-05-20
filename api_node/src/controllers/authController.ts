import { Request, Response } from "express";
import { comparePassword, generateToken } from "../services/authService";
import {
  AuthRequest,
  LoginResponse,
  ErrorResponse,
  MockCredentials,
} from "./types/auth";
import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

const MOCK_CREDENTIALS: MockCredentials = {
  email: "example_user@mail.com",
  password: bcrypt.hashSync("6CPh(4{LmtW2", saltRounds),
};

export const generateAuthToken = async (
  req: AuthRequest,
  res: Response<LoginResponse | ErrorResponse>
) => {
  const { email, password } = req.body;
  const isEmailValid = email === MOCK_CREDENTIALS.email;

  const isPasswordValid = await comparePassword(
    password,
    MOCK_CREDENTIALS.password
  );
  if (!isPasswordValid || !isEmailValid) {
    res.status(401).json({ message: "Credenciales incorrectas." });
    return;
  }

  const token = generateToken(email);
  res.json({ token });
};
