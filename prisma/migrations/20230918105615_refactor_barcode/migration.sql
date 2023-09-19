/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Barcode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barcode_code_key" ON "Barcode"("code");
