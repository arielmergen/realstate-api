/*
  Warnings:

  - Changed the type of `phone` on the `GeneralConfiguration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "phoneNumber" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "GeneralConfiguration" DROP COLUMN "phone",
ADD COLUMN     "phone" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "phoneNumber" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE BIGINT,
ALTER COLUMN "officePhone" SET DATA TYPE BIGINT;
