-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_gridConfigurationId_fkey";

-- DropForeignKey
ALTER TABLE "Slide" DROP CONSTRAINT "Slide_sliderConfigurationId_fkey";

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderConfigurationId_fkey" FOREIGN KEY ("sliderConfigurationId") REFERENCES "SliderConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_gridConfigurationId_fkey" FOREIGN KEY ("gridConfigurationId") REFERENCES "GridConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;
