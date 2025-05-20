
import { Request } from "express";

export interface MatrixData {
  Q: number[][];
  R: number[][];
}

export interface MatrixOperations {
  maxValue: number;
  minValue: number;
  average: number;
  totalSum: number;
  isDiagonal: boolean;
}

export interface MatrixOperationResponse {
  OperationsMatrixQ: MatrixOperations;
  OperationsMatrixR: MatrixOperations;
}

export interface MatrixRequest extends Request {
  body: MatrixData;
}

export interface SingleMatrixData {
  matrix: number[][];
}

export interface MatrixErrorResponse {
  error: string;
  message: string;
}