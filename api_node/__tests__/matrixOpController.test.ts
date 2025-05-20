import request from "supertest";
import express from "express";
import { matrixOperationController } from "../src/controllers/matrixOpController";

const app = express();
app.use(express.json());
app.post("/matrix-op", matrixOperationController as any);

describe("POST /matrix-op", () => {
  it("should return matrix operations", async () => {
    const response = await request(app).post("/matrix-op").send({
      Q: [
        [1, 0],
        [0, 2],
      ],
      R: [
        [3, 4],
        [5, 6],
      ],
    });

    expect(response.status).toBe(200);
    expect(response.body.OperationsMatrixQ.maxValue).toBe(2);
  });

  it("should return 400 for invalid matrix", async () => {
    const response = await request(app).post("/matrix-op").send({
      Q: [["1", 0], [0, 2]], // Invalid matrix (string instead of number)
      R: [[1, 2], [3, 4]],
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Matrix Q");
  });
});
