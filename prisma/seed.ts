import { PrismaClient } from "@prisma/client";

async function seed() {
  const db = new PrismaClient()

  const someUser = await db.user.findFirst();
  if (!someUser) {
    console.log("Seeding user");
    await db.user.create({
      data: {
        name: "Dylan",
        email: "dylanblokhuis3@hotmail.com",
        password: "password",      
      }
    })
  }

  const somePostType = await db.postType.findFirst();
  if (!somePostType) {
    console.log("Seeding postType");
    await db.postType.createMany({
      data: [
        {
          slug: "posts",
          plural: "Posts",
          singular: "Post",
        },
        {
          slug: "pages",
          plural: "Pages",
          singular: "Page",
        }
      ]
    })
  }

  const somePost = await db.post.findFirst();
  if (!somePost) {
    console.log("Seeding post");
    await db.post.create({
      data: {
        title: "Hello world",
        content: "<p>This is a post</p>",
        excerpt: "Short post description",
        slug: "hello-world",
        status: "PUBLISHED",
        author: {
          connect: {
            email: "dylanblokhuis3@hotmail.com"
          }
        },
        postType: {
          connect: {
            slug: "posts"
          }
        },
      }
    })
  }

  console.log("Done seeding!");
}

seed();