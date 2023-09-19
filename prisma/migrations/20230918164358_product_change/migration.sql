-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "inventory" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "base_discount_percentage" INTEGER NOT NULL,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("base_discount_percentage", "base_price", "id", "inventory", "product_id") SELECT "base_discount_percentage", "base_price", "id", "inventory", "product_id" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_product_id_id_key" ON "Price"("product_id", "id");
CREATE TABLE "new_Barcode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "Barcode_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Barcode" ("code", "id", "product_id") SELECT "code", "id", "product_id" FROM "Barcode";
DROP TABLE "Barcode";
ALTER TABLE "new_Barcode" RENAME TO "Barcode";
CREATE UNIQUE INDEX "Barcode_code_key" ON "Barcode"("code");
CREATE UNIQUE INDEX "Barcode_product_id_id_key" ON "Barcode"("product_id", "id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
