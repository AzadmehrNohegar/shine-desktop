-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Price" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "inventory" INTEGER NOT NULL,
    "base_price" INTEGER NOT NULL,
    "base_discount_percentage" INTEGER DEFAULT 0,
    CONSTRAINT "Price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Price" ("base_discount_percentage", "base_price", "id", "inventory", "product_id") SELECT "base_discount_percentage", "base_price", "id", "inventory", "product_id" FROM "Price";
DROP TABLE "Price";
ALTER TABLE "new_Price" RENAME TO "Price";
CREATE UNIQUE INDEX "Price_product_id_base_price_key" ON "Price"("product_id", "base_price");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
