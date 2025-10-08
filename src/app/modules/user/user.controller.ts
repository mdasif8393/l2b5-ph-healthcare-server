import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  console.log("Patient", req.body);
});

export const userController = {
  createPatient,
};
