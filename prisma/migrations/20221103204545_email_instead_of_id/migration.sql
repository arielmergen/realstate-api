/*
  Warnings:

  - You are about to drop the column `createdById` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[createdByEmail]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdByEmail` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_createdById_fkey";

-- DropIndex
DROP INDEX "Property_createdById_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "createdById",
ADD COLUMN     "createdByEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_createdByEmail_key" ON "Property"("createdByEmail");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
