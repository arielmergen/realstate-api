-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pictureId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Image"("publicId") ON DELETE SET NULL ON UPDATE CASCADE;
