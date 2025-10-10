import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = await jwt.sign(
    { email: user.email, role: user.role },
    "abcd",
    {
      algorithm: "HS256",
      expiresIn: "1h",
    }
  );

  const refreshToken = await jwt.sign(
    { email: user.email, role: user.role },
    "abcd",
    {
      algorithm: "HS256",
      expiresIn: "90d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  login,
};
