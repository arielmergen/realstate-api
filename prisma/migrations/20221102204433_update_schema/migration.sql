/*
  Warnings:

  - You are about to drop the column `closenessId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `tipologyId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `Additional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Closeness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tipology` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdditionalToProperty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdditionalToType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AmenityToType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ServiceToType` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('Vendida', 'Reservada', 'Disponible', 'Alquilada');

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_closenessId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_tipologyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalToProperty" DROP CONSTRAINT "_AdditionalToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalToProperty" DROP CONSTRAINT "_AdditionalToProperty_B_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalToType" DROP CONSTRAINT "_AdditionalToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalToType" DROP CONSTRAINT "_AdditionalToType_B_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToType" DROP CONSTRAINT "_AmenityToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToType" DROP CONSTRAINT "_AmenityToType_B_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToType" DROP CONSTRAINT "_ServiceToType_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToType" DROP CONSTRAINT "_ServiceToType_B_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "closenessId",
DROP COLUMN "tipologyId",
ADD COLUMN     "closeness" TEXT,
ADD COLUMN     "ownerId" INTEGER,
ADD COLUMN     "tipology" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;

-- DropTable
DROP TABLE "Additional";

-- DropTable
DROP TABLE "Closeness";

-- DropTable
DROP TABLE "Tipology";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "_AdditionalToProperty";

-- DropTable
DROP TABLE "_AdditionalToType";

-- DropTable
DROP TABLE "_AmenityToType";

-- DropTable
DROP TABLE "_ServiceToType";

-- CreateTable
CREATE TABLE "Owner" (
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "lastName" TEXT,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "states" "State"[],

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AmenityToPropertyType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyTypeToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_name_key" ON "PropertyType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToPropertyType_AB_unique" ON "_AmenityToPropertyType"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToPropertyType_B_index" ON "_AmenityToPropertyType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyTypeToService_AB_unique" ON "_PropertyTypeToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyTypeToService_B_index" ON "_PropertyTypeToService"("B");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPropertyType" ADD CONSTRAINT "_AmenityToPropertyType_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPropertyType" ADD CONSTRAINT "_AmenityToPropertyType_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyTypeToService" ADD CONSTRAINT "_PropertyTypeToService_A_fkey" FOREIGN KEY ("A") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyTypeToService" ADD CONSTRAINT "_PropertyTypeToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
