import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  try {
    const { name, slug } = req.body;

    const response = await prisma.category.create({
      data: {
        name: name,
        slug: slug,
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default newCategory;
