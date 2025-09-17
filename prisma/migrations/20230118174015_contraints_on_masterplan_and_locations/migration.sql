-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_featureId_fkey";

-- DropForeignKey
ALTER TABLE "Masterplan" DROP CONSTRAINT "Masterplan_featureId_fkey";

-- AddForeignKey
ALTER TABLE "Masterplan" ADD CONSTRAINT "Masterplan_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
