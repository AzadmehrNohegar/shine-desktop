/*
  Warnings:

  - A unique constraint covering the columns `[product_id,id]` on the table `Barcode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,id]` on the table `Price` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Barcode_product_id_id_key" ON "Barcode"("product_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Price_product_id_id_key" ON "Price"("product_id", "id");
