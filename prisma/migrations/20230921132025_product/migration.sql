/*
  Warnings:

  - A unique constraint covering the columns `[internal_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_internal_code_key" ON "Product"("internal_code");
