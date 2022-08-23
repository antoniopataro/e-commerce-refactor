import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const newUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  try {
    const user = req.body;

    const password = await bcrypt.hash(user.password, 10);

    const response = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: password,
        imageUrl: user.imageUrl,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return res.status(200).json({
      user: {
        id: response.id,
        email: response.email,
        name: response.name,
        imageUrl: response.imageUrl,
      },
      token: token,
    });
  } catch (e: any) {
    console.log(e);

    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default newUser;
