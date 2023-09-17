-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Refund" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order_id" INTEGER NOT NULL,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'from',
    CONSTRAINT "Refund_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Refund" ("created_date", "id", "modified_date", "order_id", "status") SELECT "created_date", "id", "modified_date", "order_id", "status" FROM "Refund";
DROP TABLE "Refund";
ALTER TABLE "new_Refund" RENAME TO "Refund";
CREATE UNIQUE INDEX "Refund_order_id_key" ON "Refund"("order_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
