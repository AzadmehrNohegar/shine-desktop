/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Order` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'temp',
    "user_phone" TEXT,
    "is_refunded" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Order" ("created_date", "id", "is_refunded", "status", "user_phone") SELECT "created_date", "id", "is_refunded", "status", "user_phone" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
