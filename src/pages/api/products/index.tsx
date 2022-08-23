import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fromSlugToName = (slug: string) => {
  return slug
    .split("-")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(" ");
};

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed." });

  const { take, skip, category, tags } = req.query;

  try {
    if (tags) {
      const response = await prisma.product.findMany({
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
        where: {
          categoryName: {
            contains: category ? fromSlugToName(category as string) : undefined,
          },
          tags: {
            hasEvery: tags ? JSON.parse(tags as string) : undefined,
          },
        },
      });

      return res.status(200).json(response);
    }

    const response = await prisma.product.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      where: {
        categoryName: {
          contains: category ? fromSlugToName(category as string) : undefined,
        },
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default products;
