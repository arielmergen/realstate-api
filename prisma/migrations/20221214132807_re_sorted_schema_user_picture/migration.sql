/*
  Warnings:

  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pictureId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pictureId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "picture",
ADD COLUMN     "pictureId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_pictureId_key" ON "User"("pictureId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
