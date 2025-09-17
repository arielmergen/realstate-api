/*
  Warnings:

  - The primary key for the `Amenity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Entrepreneurship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GeneralConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GridConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `HomeConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Masterplan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Neighborhood` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Owner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PropertyType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Slide` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SliderConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `roleId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Entrepreneurship" DROP CONSTRAINT "Entrepreneurship_zoneId_fkey";

-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_homeConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_highlightedImageId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_secondaryImageId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Masterplan" DROP CONSTRAINT "Masterplan_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Neighborhood" DROP CONSTRAINT "Neighborhood_entrepreneurshipId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_geoCityId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_geoLocationId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_geoZoneId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_gridConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_sliderConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "SliderConfiguration" DROP CONSTRAINT "SliderConfiguration_featureId_fkey";

-- DropForeignKey
ALTER TABLE "SliderConfiguration" DROP CONSTRAINT "SliderConfiguration_homeConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToProperty" DROP CONSTRAINT "_AmenityToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToProperty" DROP CONSTRAINT "_AmenityToProperty_B_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToPropertyType" DROP CONSTRAINT "_AmenityToPropertyType_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToPropertyType" DROP CONSTRAINT "_AmenityToPropertyType_B_fkey";

-- DropForeignKey
ALTER TABLE "_FeatureToMasterplan" DROP CONSTRAINT "_FeatureToMasterplan_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeatureToMasterplan" DROP CONSTRAINT "_FeatureToMasterplan_B_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProperty" DROP CONSTRAINT "_ImageToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_ImageToProperty" DROP CONSTRAINT "_ImageToProperty_B_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToService" DROP CONSTRAINT "_PropertyToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyToService" DROP CONSTRAINT "_PropertyToService_B_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyTypeToService" DROP CONSTRAINT "_PropertyTypeToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_PropertyTypeToService" DROP CONSTRAINT "_PropertyTypeToService_B_fkey";

-- AlterTable
ALTER TABLE "Amenity" DROP CONSTRAINT "Amenity_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Amenity_id_seq";

-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Contact_id_seq";

-- AlterTable
ALTER TABLE "Entrepreneurship" DROP CONSTRAINT "Entrepreneurship_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "zoneId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Entrepreneurship_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Entrepreneurship_id_seq";

-- AlterTable
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Feature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Feature_id_seq";

-- AlterTable
ALTER TABLE "GeneralConfiguration" DROP CONSTRAINT "GeneralConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GeneralConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GeneralConfiguration_id_seq";

-- AlterTable
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "featureId" SET DATA TYPE TEXT,
ALTER COLUMN "homeConfigurationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GridConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GridConfiguration_id_seq";

-- AlterTable
ALTER TABLE "HomeConfiguration" DROP CONSTRAINT "HomeConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HomeConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HomeConfiguration_id_seq";

-- AlterTable
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "highlightedImageId" SET DATA TYPE TEXT,
ALTER COLUMN "secondaryImageId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Image_id_seq";

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "featureId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Location_id_seq";

-- AlterTable
ALTER TABLE "Masterplan" DROP CONSTRAINT "Masterplan_pkey",
ALTER COLUMN "featureId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Masterplan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Masterplan_id_seq";

-- AlterTable
ALTER TABLE "Neighborhood" DROP CONSTRAINT "Neighborhood_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "entrepreneurshipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Neighborhood_id_seq";

-- AlterTable
ALTER TABLE "Owner" DROP CONSTRAINT "Owner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Owner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Owner_id_seq";

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
ALTER COLUMN "geoCityId" SET DATA TYPE TEXT,
ALTER COLUMN "geoLocationId" SET DATA TYPE TEXT,
ALTER COLUMN "geoZoneId" SET DATA TYPE TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "typeId" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Property_id_seq";

-- AlterTable
ALTER TABLE "PropertyType" DROP CONSTRAINT "PropertyType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PropertyType_id_seq";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Role_id_seq";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Service_id_seq";

-- AlterTable
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "imageId" SET DATA TYPE TEXT,
ALTER COLUMN "sliderConfigurationId" SET DATA TYPE TEXT,
ALTER COLUMN "gridConfigurationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slide_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slide_id_seq";

-- AlterTable
ALTER TABLE "SliderConfiguration" DROP CONSTRAINT "SliderConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "featureId" SET DATA TYPE TEXT,
ALTER COLUMN "homeConfigurationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SliderConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SliderConfiguration_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "roleId" SET NOT NULL,
ALTER COLUMN "roleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zone_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zone_id_seq";

-- AlterTable
ALTER TABLE "_AmenityToProperty" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_AmenityToPropertyType" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_FeatureToMasterplan" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ImageToProperty" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PropertyToService" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PropertyTypeToService" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderConfigurationId_fkey" FOREIGN KEY ("sliderConfigurationId") REFERENCES "SliderConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_gridConfigurationId_fkey" FOREIGN KEY ("gridConfigurationId") REFERENCES "GridConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_highlightedImageId_fkey" FOREIGN KEY ("highlightedImageId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_secondaryImageId_fkey" FOREIGN KEY ("secondaryImageId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrepreneurship" ADD CONSTRAINT "Entrepreneurship_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Neighborhood" ADD CONSTRAINT "Neighborhood_entrepreneurshipId_fkey" FOREIGN KEY ("entrepreneurshipId") REFERENCES "Entrepreneurship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_geoCityId_fkey" FOREIGN KEY ("geoCityId") REFERENCES "Neighborhood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_geoLocationId_fkey" FOREIGN KEY ("geoLocationId") REFERENCES "Entrepreneurship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_geoZoneId_fkey" FOREIGN KEY ("geoZoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Masterplan" ADD CONSTRAINT "Masterplan_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPropertyType" ADD CONSTRAINT "_AmenityToPropertyType_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToPropertyType" ADD CONSTRAINT "_AmenityToPropertyType_B_fkey" FOREIGN KEY ("B") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyTypeToService" ADD CONSTRAINT "_PropertyTypeToService_A_fkey" FOREIGN KEY ("A") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyTypeToService" ADD CONSTRAINT "_PropertyTypeToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProperty" ADD CONSTRAINT "_ImageToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageToProperty" ADD CONSTRAINT "_ImageToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToService" ADD CONSTRAINT "_PropertyToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToService" ADD CONSTRAINT "_PropertyToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToMasterplan" ADD CONSTRAINT "_FeatureToMasterplan_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToMasterplan" ADD CONSTRAINT "_FeatureToMasterplan_B_fkey" FOREIGN KEY ("B") REFERENCES "Masterplan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
