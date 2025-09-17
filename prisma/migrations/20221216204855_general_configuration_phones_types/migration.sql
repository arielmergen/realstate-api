/*
  Warnings:

  - Changed the type of `whatsapp` on the `GeneralConfiguration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GeneralConfiguration" DROP COLUMN "whatsapp",
ADD COLUMN     "whatsapp" DOUBLE PRECISION NOT NULL;
