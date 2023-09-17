/*
  Warnings:

  - A unique constraint covering the columns `[id,order_id]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderItem_id_quantity_key";

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_order_id_key" ON "OrderItem"("id", "order_id");
