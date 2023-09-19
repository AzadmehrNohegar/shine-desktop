/*
  Warnings:

  - A unique constraint covering the columns `[product_id,code]` on the table `Barcode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Barcode_product_id_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Barcode_product_id_code_key" ON "Barcode"("product_id", "code");
