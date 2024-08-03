/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Toy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Toy_name_key` ON `Toy`(`name`);
