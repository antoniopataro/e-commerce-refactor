import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteCategoryByName = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed." });

  const { name } = req.query;

  try {
    const response = await prisma.category.delete({
      where: {
        name: name as string,
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default deleteCategoryByName;
