-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pictureId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pictureId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
