-- CreateTable
CREATE TABLE "Pos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "psp" TEXT NOT NULL DEFAULT 'BPM'
);

-- CreateTable
CREATE TABLE "PosTransaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL,
    "ref_id" TEXT,
    "pan" TEXT,
    "terminal_number" TEXT,
    "created_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "status_code" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Pos_name_key" ON "Pos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pos_ip_key" ON "Pos"("ip");
