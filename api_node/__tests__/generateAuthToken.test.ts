import { generateAuthToken } from "../src/controllers/authController";
import { generateToken } from "../src/services/authService";
import { Request, Response } from "express";

jest.mock("../src/services/authService", () => ({
  generateToken: jest.fn(() => "mocked-jwt-token"),
}));

describe("generateAuthToken", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    req = {
      body: {
        username: "admin",
        password: "secret123",
      },
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should return a token for valid credentials", () => {
    generateAuthToken(req as any, res as any);

    expect(generateToken).toHaveBeenCalledWith("admin");
    expect(jsonMock).toHaveBeenCalledWith({ token: "mocked-jwt-token" });
  });

  it("should return 401 for invalid credentials", () => {
    req.body.username = "wrong";
    req.body.password = "credentials";

    generateAuthToken(req as any, res as any);

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Credenciales incorrectas.",
    });
  });
});
