-- CreateTable
CREATE TABLE "GeneralConfiguration" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "gtm" TEXT NOT NULL,
    "facebookPixel" TEXT NOT NULL,
    "copyright" TEXT NOT NULL,

    CONSTRAINT "GeneralConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "description" TEXT,
    "id" SERIAL NOT NULL,
    "imageId" INTEGER,
    "link" TEXT,
    "name" TEXT,
    "title" TEXT,
    "sliderConfigurationId" INTEGER,
    "gridConfigurationId" INTEGER,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SliderConfiguration" (
    "id" SERIAL NOT NULL,
    "featureId" INTEGER,
    "homeConfigurationId" INTEGER,

    CONSTRAINT "SliderConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GridConfiguration" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "featureId" INTEGER,
    "homeConfigurationId" INTEGER,

    CONSTRAINT "GridConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "id" SERIAL NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "phone" INTEGER,
    "officePhone" INTEGER,
    "picture" TEXT,
    "roleId" INTEGER,
    "state" INTEGER,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "description" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Additional" (
    "icon" TEXT,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "icon" TEXT,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "icon" TEXT,
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "states" TEXT[],

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tipology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Closeness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Closeness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "alt" TEXT,
    "id" SERIAL NOT NULL,
    "isHighlighted" BOOLEAN,
    "highlightedImageId" INTEGER,
    "secondaryImageId" INTEGER,
    "src" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrepreneurship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "zoneId" INTEGER NOT NULL,
    "tokkoId" INTEGER,

    CONSTRAINT "Entrepreneurship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "entrepreneurshipId" INTEGER NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "antiquity" INTEGER,
    "attachments" TEXT[],
    "backyardSquareSpace" DOUBLE PRECISION,
    "bathroomsAmount" INTEGER,
    "bedroomsAmount" INTEGER,
    "code" TEXT NOT NULL,
    "commission" INTEGER NOT NULL,
    "condition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currency" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "disposal" TEXT,
    "expenses" DOUBLE PRECISION,
    "featured" BOOLEAN,
    "floors" INTEGER,
    "frontSquareSpace" DOUBLE PRECISION,
    "garageAmount" INTEGER,
    "geoAddress" TEXT NOT NULL,
    "geoAddressApartment" TEXT,
    "geoAddressBetweenStreet1" TEXT,
    "geoAddressBetweenStreet2" TEXT,
    "geoAddressFloor" TEXT,
    "geoAddressNumber" TEXT NOT NULL,
    "geoCityId" INTEGER,
    "geoLocationId" INTEGER NOT NULL,
    "geoNear" TEXT,
    "geoZipCode" TEXT,
    "geoZoneId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "innerSquareSpace" DOUBLE PRECISION,
    "innerState" TEXT NOT NULL,
    "isCreditAvaiable" BOOLEAN,
    "isDirectionHidden" BOOLEAN,
    "isEntrepreneurship" BOOLEAN,
    "isHighlighted" BOOLEAN,
    "isOccupied" BOOLEAN,
    "isProfessionalAvaiable" BOOLEAN,
    "isPublicPrice" BOOLEAN,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "operation" TEXT NOT NULL,
    "orientation" TEXT,
    "outterSquareSpace" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "semiGarageAmount" INTEGER,
    "semiInnerSquareSpace" DOUBLE PRECISION,
    "spacesNumber" INTEGER,
    "state" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "toilettesAmount" INTEGER,
    "totalBuiltSquareSpace" DOUBLE PRECISION,
    "totalSquareSpace" DOUBLE PRECISION,
    "typeId" INTEGER,
    "tipologyId" INTEGER,
    "closenessId" INTEGER,
    "isReplicated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Masterplan" (
    "description" TEXT,
    "featureId" INTEGER,
    "id" SERIAL NOT NULL,
    "src" TEXT,
    "title" TEXT,

    CONSTRAINT "Masterplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeConfiguration" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "HomeConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "description" TEXT,
    "featureId" INTEGER,
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "title" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "highlightedItems" TEXT[],
    "id" SERIAL NOT NULL,
    "innerState" TEXT NOT NULL,
    "secondaryDescription" TEXT,
    "secondarySubtitle" TEXT,
    "secondaryTitle" TEXT,
    "subtitle" TEXT,
    "template" TEXT NOT NULL,
    "title" TEXT,
    "video" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdditionalToProperty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AdditionalToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AmenityToProperty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AmenityToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ServiceToType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToProperty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FeatureToMasterplan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SliderConfiguration_featureId_key" ON "SliderConfiguration"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "SliderConfiguration_homeConfigurationId_key" ON "SliderConfiguration"("homeConfigurationId");

-- CreateIndex
CREATE UNIQUE INDEX "GridConfiguration_featureId_key" ON "GridConfiguration"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "GridConfiguration_homeConfigurationId_key" ON "GridConfiguration"("homeConfigurationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Additional_name_key" ON "Additional"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tipology_name_key" ON "Tipology"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Closeness_name_key" ON "Closeness"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Image_highlightedImageId_key" ON "Image"("highlightedImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_secondaryImageId_key" ON "Image"("secondaryImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Masterplan_featureId_key" ON "Masterplan"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_featureId_key" ON "Location"("featureId");

-- CreateIndex
CREATE UNIQUE INDEX "_AdditionalToProperty_AB_unique" ON "_AdditionalToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AdditionalToProperty_B_index" ON "_AdditionalToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdditionalToType_AB_unique" ON "_AdditionalToType"("A", "B");

-- CreateIndex
CREATE INDEX "_AdditionalToType_B_index" ON "_AdditionalToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToProperty_AB_unique" ON "_AmenityToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToProperty_B_index" ON "_AmenityToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AmenityToType_AB_unique" ON "_AmenityToType"("A", "B");

-- CreateIndex
CREATE INDEX "_AmenityToType_B_index" ON "_AmenityToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceToType_AB_unique" ON "_ServiceToType"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceToType_B_index" ON "_ServiceToType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToProperty_AB_unique" ON "_ImageToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToProperty_B_index" ON "_ImageToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToService_AB_unique" ON "_PropertyToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToService_B_index" ON "_PropertyToService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToMasterplan_AB_unique" ON "_FeatureToMasterplan"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToMasterplan_B_index" ON "_FeatureToMasterplan"("B");

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
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Property" ADD CONSTRAINT "Property_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_tipologyId_fkey" FOREIGN KEY ("tipologyId") REFERENCES "Tipology"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_closenessId_fkey" FOREIGN KEY ("closenessId") REFERENCES "Closeness"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Masterplan" ADD CONSTRAINT "Masterplan_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToProperty" ADD CONSTRAINT "_AdditionalToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Additional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToProperty" ADD CONSTRAINT "_AdditionalToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToType" ADD CONSTRAINT "_AdditionalToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Additional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToType" ADD CONSTRAINT "_AdditionalToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToProperty" ADD CONSTRAINT "_AmenityToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToType" ADD CONSTRAINT "_AmenityToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AmenityToType" ADD CONSTRAINT "_AmenityToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToType" ADD CONSTRAINT "_ServiceToType_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToType" ADD CONSTRAINT "_ServiceToType_B_fkey" FOREIGN KEY ("B") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
