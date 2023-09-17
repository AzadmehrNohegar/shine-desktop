/*
  Warnings:

  - A unique constraint covering the columns `[id,quantity]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Refund" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'from',
    CONSTRAINT "Refund_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RefundItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refund_id" INTEGER NOT NULL,
    "order_item_id" INTEGER NOT NULL,
    "order_item_quantity" INTEGER NOT NULL,
    CONSTRAINT "RefundItem_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "Refund" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefundItem_order_item_id_order_item_quantity_fkey" FOREIGN KEY ("order_item_id", "order_item_quantity") REFERENCES "OrderItem" ("id", "quantity") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Refund_order_id_key" ON "Refund"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefundItem_order_item_id_key" ON "RefundItem"("order_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefundItem_order_item_id_order_item_quantity_key" ON "RefundItem"("order_item_id", "order_item_quantity");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_quantity_key" ON "OrderItem"("id", "quantity");
