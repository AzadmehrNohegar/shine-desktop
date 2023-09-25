/*
  Warnings:

  - Added the required column `updated_date` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'temp',
    "user_phone" TEXT,
    "is_refunded" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Order" ("created_date", "id", "is_refunded", "status", "user_phone") SELECT "created_date", "id", "is_refunded", "status", "user_phone" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
