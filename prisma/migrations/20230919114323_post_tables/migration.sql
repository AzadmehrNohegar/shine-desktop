-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PosTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pos_id" INTEGER,
    "amount" INTEGER NOT NULL,
    "ref_id" TEXT,
    "pan" TEXT,
    "terminal_number" TEXT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "status_code" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "PosTransaction_pos_id_fkey" FOREIGN KEY ("pos_id") REFERENCES "Pos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PosTransaction" ("amount", "created_date", "id", "pan", "ref_id", "status", "status_code", "terminal_number", "updated_date") SELECT "amount", "created_date", "id", "pan", "ref_id", "status", "status_code", "terminal_number", "updated_date" FROM "PosTransaction";
DROP TABLE "PosTransaction";
ALTER TABLE "new_PosTransaction" RENAME TO "PosTransaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
