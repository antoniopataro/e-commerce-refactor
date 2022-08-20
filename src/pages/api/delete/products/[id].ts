import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteProductById = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed." });

  const { id } = req.query;

  try {
    const response = await prisma.product.delete({
      where: {
        id: id as string,
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default deleteProductById;
