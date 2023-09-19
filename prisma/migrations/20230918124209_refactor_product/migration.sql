/*
  Warnings:

  - You are about to drop the column `base_discount` on the `Price` table. All the data in the column will be lost.
  - Added the required column `base_discount_percentage` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "inventory" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "base_discount_percentage" INTEGER NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("base_price", "id", "inventory", "product_id") SELECT "base_price", "id", "inventory", "product_id" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_product_id_id_key" ON "Price"("product_id", "id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
