/*
  Warnings:

  - Added the required column `product_id` to the `Barcode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Barcode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Barcode_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Barcode" ("code", "id") SELECT "code", "id" FROM "Barcode";
DROP TABLE "Barcode";
ALTER TABLE "new_Barcode" RENAME TO "Barcode";
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "inventory" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "base_discount" INTEGER NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("base_discount", "base_price", "id", "inventory") SELECT "base_discount", "base_price", "id", "inventory" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
