import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findProductById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed." });

  const { id } = req.query;

  try {
    const response = await prisma.product.findUnique({
      where: {
        id: id as string,
      },
    });

    if (!response) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default findProductById;
