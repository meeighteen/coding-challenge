import { Request, Response } from "express";
import { Matrix } from "../utils/matrix";
import {
  MatrixErrorResponse,
  MatrixOperationResponse,
  MatrixRequest,
} from "./types/matrixOp";

export const matrixOperationController = (
  req: MatrixRequest,
  res: Response<MatrixOperationResponse | MatrixErrorResponse>
) => {
  const { Q, R } = req.body;

  const newMatrixQ = Matrix.create(Q);
  const newMatrixR = Matrix.create(R);
  let matrixQ: Matrix;
  let matrixR: Matrix;

  if (!newMatrixQ.success) {
    res.status(400).json({
      error: "Invalid Matrix Q",
      message: newMatrixQ.error,
    });
    return;
  }

  matrixQ = newMatrixQ.matrix;

  if (!newMatrixR.success) {
    res.status(400).json({
      error: "Invalid Matrix R",
      message: newMatrixR.error,
    });
    return;
  }

  matrixR = newMatrixR.matrix;

  const OperationsMatrixQ = {
    maxValue: matrixQ.getMax(),
    minValue: matrixQ.getMin(),
    average: matrixQ.getAverage(),
    totalSum: matrixQ.getSum(),
    isDiagonal: matrixQ.isDiagonal(),
  };

  const OperationsMatrixR = {
    maxValue: matrixR.getMax(),
    minValue: matrixR.getMin(),
    average: matrixR.getAverage(),
    totalSum: matrixR.getSum(),
    isDiagonal: matrixR.isDiagonal(),
  };

  res.json({
    OperationsMatrixQ,
    OperationsMatrixR,
  });
};
