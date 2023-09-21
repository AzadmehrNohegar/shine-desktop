/*
  Warnings:

  - You are about to drop the column `use_phone` on the `Payment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "wallet_transaction" INTEGER NOT NULL DEFAULT 0,
    "user_phone" TEXT,
    "pos_transaction_id" INTEGER,
    "order_id" INTEGER,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL,
    CONSTRAINT "Payment_pos_transaction_id_fkey" FOREIGN KEY ("pos_transaction_id") REFERENCES "PosTransaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("amount", "created_date", "id", "order_id", "pos_transaction_id", "updated_date", "wallet_transaction") SELECT "amount", "created_date", "id", "order_id", "pos_transaction_id", "updated_date", "wallet_transaction" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
