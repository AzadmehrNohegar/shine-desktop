/*
  Warnings:

  - A unique constraint covering the columns `[product_id,base_price]` on the table `Price` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Price_product_id_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Price_product_id_base_price_key" ON "Price"("product_id", "base_price");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
