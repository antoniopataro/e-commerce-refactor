import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const findUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!(await bcrypt.compare(password, user!.password))) {
      return res.status(403).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
      },
      token: token,
    });
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default findUserByEmail;
