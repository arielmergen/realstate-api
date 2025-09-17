/*
  Warnings:

  - The `states` column on the `PropertyType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PropertyType" DROP COLUMN "states",
ADD COLUMN     "states" TEXT[] DEFAULT ARRAY['Vendida', 'Reservada', 'Disponible', 'Alquilada']::TEXT[];

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;
