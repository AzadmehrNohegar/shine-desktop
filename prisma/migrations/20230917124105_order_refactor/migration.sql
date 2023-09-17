-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefundItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refund_id" INTEGER NOT NULL,
    "order_item_id" INTEGER NOT NULL,
    "order_item_quantity" INTEGER NOT NULL,
    CONSTRAINT "RefundItem_refund_id_fkey" FOREIGN KEY ("refund_id") REFERENCES "Refund" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RefundItem_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "OrderItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RefundItem" ("id", "order_item_id", "order_item_quantity", "refund_id") SELECT "id", "order_item_id", "order_item_quantity", "refund_id" FROM "RefundItem";
DROP TABLE "RefundItem";
ALTER TABLE "new_RefundItem" RENAME TO "RefundItem";
CREATE UNIQUE INDEX "RefundItem_order_item_id_key" ON "RefundItem"("order_item_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
