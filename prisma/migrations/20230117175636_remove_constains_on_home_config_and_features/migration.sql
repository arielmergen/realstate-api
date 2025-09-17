-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_homeConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "SliderConfiguration" DROP CONSTRAINT "SliderConfiguration_featureId_fkey";

-- DropForeignKey
ALTER TABLE "SliderConfiguration" DROP CONSTRAINT "SliderConfiguration_homeConfigurationId_fkey";

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
