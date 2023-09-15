/*
  Warnings:

  - You are about to drop the column `sell_price` on the `Price` table. All the data in the column will be lost.
  - Added the required column `base_discount` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inventory" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "base_discount" INTEGER NOT NULL,
    CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("base_price", "id", "inventory") SELECT "base_price", "id", "inventory" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
