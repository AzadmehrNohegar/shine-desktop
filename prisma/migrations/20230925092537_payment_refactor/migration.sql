/*
  Warnings:

  - A unique constraint covering the columns `[pos_transaction_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_pos_transaction_id_key" ON "Payment"("pos_transaction_id");
