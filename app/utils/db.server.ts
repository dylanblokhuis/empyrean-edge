import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export type { User, PostType, Post } from "@prisma/client"
export default db