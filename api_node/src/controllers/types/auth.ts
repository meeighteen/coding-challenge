import { Request, Response } from "express";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  message: string;
}

export interface MockCredentials {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  body: LoginRequest;
}