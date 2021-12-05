/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `PostType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PostType_slug_key` ON `PostType`(`slug`);
