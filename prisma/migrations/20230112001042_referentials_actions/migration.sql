-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GridConfiguration" DROP CONSTRAINT "GridConfiguration_homeConfigurationId_fkey";

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

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderConfigurationId_fkey" FOREIGN KEY ("sliderConfigurationId") REFERENCES "SliderConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_gridConfigurationId_fkey" FOREIGN KEY ("gridConfigurationId") REFERENCES "GridConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SliderConfiguration" ADD CONSTRAINT "SliderConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GridConfiguration" ADD CONSTRAINT "GridConfiguration_homeConfigurationId_fkey" FOREIGN KEY ("homeConfigurationId") REFERENCES "HomeConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
