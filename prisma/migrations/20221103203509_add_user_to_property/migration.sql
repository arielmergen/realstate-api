/*
  Warnings:

  - A unique constraint covering the columns `[createdById]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "createdById" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_createdById_key" ON "Property"("createdById");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
