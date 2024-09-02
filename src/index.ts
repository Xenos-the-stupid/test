import { Hono } from "hono";
import prisma from "../utils/prisma";

const app = new Hono();

app.get("/", async (c) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          first_name: true,
          last_name: true,
          id: true,
        },
      },
    },
    where: {
      updatedAt: {
        gt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return c.json(posts);
});

export default app;
