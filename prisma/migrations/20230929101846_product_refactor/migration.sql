/*
  Warnings:

  - You are about to alter the column `internal_code` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "internal_code" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Product" ("id", "internal_code", "is_active", "name") SELECT "id", "internal_code", "is_active", "name" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
CREATE UNIQUE INDEX "Product_internal_code_key" ON "Product"("internal_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
