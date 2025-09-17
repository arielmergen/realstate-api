/*
  Warnings:

  - Made the column `updatedAt` on table `Feature` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Feature" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "updatedAt" SET NOT NULL;
