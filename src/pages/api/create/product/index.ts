import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  try {
    const product = req.body;

    const response = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: {
          connect: {
            name: product.category,
          },
        },
        imageUrl: product.imageUrl,
        tags: JSON.parse(product.tags),
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    console.log(e);

    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default newProduct;
