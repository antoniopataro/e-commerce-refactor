import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import jwt, { JwtPayload } from "jsonwebtoken";

const authenticateUserByToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed." });

  const { token } = req.query;

  const { userId }: any = jwt.verify(token as string, process.env.JWT_SECRET!);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default authenticateUserByToken;
