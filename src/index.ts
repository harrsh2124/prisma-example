import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);

app.post("/user/create", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
    },
  });

  return res.status(200).json({
    user,
  });
});

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      Posts: true,
    },
  });

  return res.status(200).json({
    users,
  });
});

app.post("/post/create", async (req, res) => {
  const post = await prisma.post.create({
    data: {
      title: "Test One post",
      userId: 1,
    },
  });

  return res.status(200).json({
    post,
  });
});

app.get("/post", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      Categories: true,
      User: true,
    },
  });

  return res.status(200).json({
    posts,
  });
});

app.post("/category/create", async (req, res) => {
  const category = await prisma.category.create({
    data: {
      name: "Test One category",
    },
  });

  return res.status(200).json({
    category,
  });
});

app.get("/category", async (req, res) => {
  const categories = await prisma.category.findMany({
    include: {
      Posts: true,
    },
  });

  return res.status(200).json({
    categories,
  });
});

app.put("/post/category", async (req, res) => {
  const post = await prisma.post.update({
    where: {
      id: 1,
    },
    data: {
      Categories: {
        set: {
          id: 1,
        },
      },
    },
  });

  return res.status(200).json({
    post,
  });
});
