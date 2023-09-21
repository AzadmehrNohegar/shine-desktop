/*
  Warnings:

  - You are about to drop the column `post` on the `Pos` table. All the data in the column will be lost.
  - Added the required column `port` to the `Pos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "psp" TEXT NOT NULL DEFAULT 'BPM'
);
INSERT INTO "new_Pos" ("id", "ip", "name", "psp") SELECT "id", "ip", "name", "psp" FROM "Pos";
DROP TABLE "Pos";
ALTER TABLE "new_Pos" RENAME TO "Pos";
CREATE UNIQUE INDEX "Pos_name_key" ON "Pos"("name");
CREATE UNIQUE INDEX "Pos_ip_key" ON "Pos"("ip");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
