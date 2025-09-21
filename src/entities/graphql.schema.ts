
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum State {
    Vendida = "Vendida",
    Reservada = "Reservada",
    Disponible = "Disponible",
    Alquilada = "Alquilada"
}

export enum RolesName {
    Guest = "Guest",
    Executive = "Executive",
    Admin = "Admin",
    Owner = "Owner"
}

export class AmenityInput {
    name: string;
    icon?: Nullable<string>;
    types?: Nullable<string[]>;
}

export class AuthInput {
    email: string;
    password: string;
}

export class RefreshInput {
    refreshToken: string;
}

export class RegisterUserInput {
    email: string;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    lastName?: Nullable<string>;
    newPassword?: Nullable<string>;
    officePhone?: Nullable<number>;
    password: string;
    phone?: Nullable<number>;
    picture?: Nullable<CreateImageInput>;
    oldPicture?: Nullable<ImageInput>;
    refreshToken?: Nullable<string>;
    username?: Nullable<string>;
}

export class ContactInput {
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    message: string;
    subject: string;
}

export class EntrepreneurshipInput {
    name: string;
    zone: string;
    tokkoId?: Nullable<string>;
}

export class MasterplanInput {
    description?: Nullable<string>;
    src?: Nullable<string>;
    title?: Nullable<string>;
}

export class UpdateMasterplanInput {
    id: string;
    description?: Nullable<string>;
    src?: Nullable<string>;
    title?: Nullable<string>;
}

export class LocationInput {
    description?: Nullable<string>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    title?: Nullable<string>;
}

export class UpdateLocationInput {
    description?: Nullable<string>;
    id: string;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    title?: Nullable<string>;
}

export class FeatureInput {
    attachments?: Nullable<MasterplanInput[]>;
    code?: Nullable<string>;
    description?: Nullable<string>;
    grid?: Nullable<GridInput>;
    highlightedImage?: Nullable<CreateImageInput>;
    highlightedItems?: Nullable<string[]>;
    innerState?: Nullable<string>;
    location?: Nullable<LocationInput>;
    masterplan?: Nullable<MasterplanInput>;
    secondaryDescription?: Nullable<string>;
    secondaryImage?: Nullable<CreateImageInput>;
    secondarySubtitle?: Nullable<string>;
    secondaryTitle?: Nullable<string>;
    slider?: Nullable<SliderInput>;
    subtitle?: Nullable<string>;
    template: string;
    title?: Nullable<string>;
    video?: Nullable<string>;
    tokkoId?: Nullable<string>;
}

export class UpdateFeatureInput {
    attachments?: Nullable<UpdateMasterplanInput[]>;
    code?: Nullable<string>;
    description?: Nullable<string>;
    grid?: Nullable<UpdateGridInput>;
    highlightedImage?: Nullable<CreateImageInput>;
    highlightedItems?: Nullable<string[]>;
    innerState?: Nullable<string>;
    location?: Nullable<UpdateLocationInput>;
    masterplan?: Nullable<UpdateMasterplanInput>;
    secondaryDescription?: Nullable<string>;
    secondaryImage?: Nullable<CreateImageInput>;
    secondarySubtitle?: Nullable<string>;
    secondaryTitle?: Nullable<string>;
    oldHighlightedImage?: Nullable<ImageInput>;
    oldSecondaryImage?: Nullable<ImageInput>;
    slider?: Nullable<UpdateSliderInput>;
    subtitle?: Nullable<string>;
    template: string;
    title?: Nullable<string>;
    video?: Nullable<string>;
    tokkoId?: Nullable<string>;
}

export class GeneralConfigurationInput {
    phone: number;
    whatsapp: number;
    email: string;
    address: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    gtm: string;
    facebookPixel: string;
    copyright: string;
}

export class GridInput {
    description?: Nullable<string>;
    slides?: Nullable<SlideInput[]>;
    title?: Nullable<string>;
}

export class UpdateGridInput {
    id?: Nullable<string>;
    description?: Nullable<string>;
    slides?: Nullable<SlideInput[]>;
    title?: Nullable<string>;
}

export class HomeConfigurationInput {
    slider?: Nullable<SliderInput>;
    grid?: Nullable<GridInput>;
}

export class UpdateHomeConfigurationInput {
    slider?: Nullable<UpdateSliderInput>;
    grid?: Nullable<UpdateGridInput>;
}

export class CreateImageInput {
    alt?: Nullable<string>;
    base64Image: string;
    isHighlighted?: Nullable<boolean>;
    order?: Nullable<number>;
    propertyId?: Nullable<string>;
}

export class CreateMultipleImagesInput {
    images: CreateImageInput[];
    propertyId?: Nullable<string>;
}

export class ImageInput {
    id?: Nullable<string>;
    alt?: Nullable<string>;
    isHighlighted?: Nullable<boolean>;
    publicId: string;
    src: string;
    order?: Nullable<number>;
    propertyId?: Nullable<string>;
}

export class UpdateImageOrderInput {
    imageId: string;
    order: number;
}

export class ReorderImagesInput {
    images: UpdateImageOrderInput[];
}

export class NeighborhoodInput {
    entrepreneurship: string;
    name: string;
    tokkoId?: Nullable<string>;
}

export class OwnerInput {
    email: string;
    firstName: string;
    lastName?: Nullable<string>;
    phone: number;
}

export class CategoriesInput {
    title: string;
    paragraph?: Nullable<string>;
}

export class FeaturedPropertiesInput {
    title: string;
    paragraph?: Nullable<string>;
}

export class FeaturedZoneInput {
    title: string;
    paragraph?: Nullable<string>;
}

export class CreateHomePageInput {
    categories?: Nullable<CategoriesInput>;
    featuredProperties?: Nullable<FeaturedPropertiesInput>;
    featuredZone?: Nullable<FeaturedZoneInput>;
}

export class PropertyInput {
    status?: Nullable<string>;
    amenities?: Nullable<string[]>;
    antiquity?: Nullable<number>;
    attachments?: Nullable<string[]>;
    backyardSquareSpace?: Nullable<number>;
    bathroomsAmount?: Nullable<number>;
    bedroomsAmount?: Nullable<number>;
    closeness?: Nullable<string>;
    commission: number;
    condition?: Nullable<string>;
    createdByEmail: string;
    currency: string;
    description: string;
    disposal?: Nullable<string>;
    expenses?: Nullable<number>;
    featured?: Nullable<boolean>;
    floors?: Nullable<number>;
    frontSquareSpace?: Nullable<number>;
    garageAmount?: Nullable<number>;
    geoAddress: string;
    geoAddressApartment?: Nullable<string>;
    geoAddressBetweenStreet1?: Nullable<string>;
    geoAddressBetweenStreet2?: Nullable<string>;
    geoAddressFloor?: Nullable<string>;
    geoAddressNumber: string;
    geoCity?: Nullable<string>;
    geoLocation: string;
    geoNear?: Nullable<string>;
    geoZipCode?: Nullable<string>;
    geoZone: string;
    images?: Nullable<CreateImageInput[]>;
    innerSquareSpace?: Nullable<number>;
    isCreditAvaiable?: Nullable<boolean>;
    isDirectionHidden?: Nullable<boolean>;
    isEntrepreneurship?: Nullable<boolean>;
    isHighlighted?: Nullable<boolean>;
    isOcuppied?: Nullable<boolean>;
    isProfessionalAvaiable?: Nullable<boolean>;
    isPublicPrice?: Nullable<boolean>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    matterport?: Nullable<string>;
    oldImages?: Nullable<ImageInput[]>;
    operation: string;
    orientation?: Nullable<string>;
    outterSquareSpace?: Nullable<number>;
    owner?: Nullable<string>;
    price: number;
    semiGarageAmount?: Nullable<number>;
    semiInnerSquareSpace?: Nullable<number>;
    services?: Nullable<string[]>;
    spacesNumber?: Nullable<number>;
    state: string;
    tipology?: Nullable<string>;
    neighborhoodType?: Nullable<string>;
    title: string;
    secondaryTitle?: Nullable<string>;
    toilettesAmount?: Nullable<number>;
    totalBuiltSquareSpace?: Nullable<number>;
    totalSquareSpace?: Nullable<number>;
    tour360?: Nullable<string>;
    type?: Nullable<string>;
    videos?: Nullable<string[]>;
}

export class FeatureFilterInput {
    amenities?: Nullable<string[]>;
    services?: Nullable<string[]>;
}

export class PropertyFiltersInput {
    amenities?: Nullable<string[]>;
    antiquity?: Nullable<number[]>;
    antiquityFrom?: Nullable<number>;
    backyardSquareSpaceFrom?: Nullable<number>;
    backyardSquareSpaceTo?: Nullable<number>;
    bedroomsAmountFrom?: Nullable<number>;
    bedroomsAmountTo?: Nullable<number>;
    currency?: Nullable<string>;
    disposal?: Nullable<string[]>;
    features?: Nullable<FeatureFilterInput>;
    frontSquareSpaceFrom?: Nullable<number>;
    frontSquareSpaceTo?: Nullable<number>;
    geoCity?: Nullable<string[]>;
    geoLocation?: Nullable<string>;
    geoZone?: Nullable<string>;
    innerSquareSpaceFrom?: Nullable<number>;
    innerSquareSpaceTo?: Nullable<number>;
    isHighlighted?: Nullable<boolean>;
    operation?: Nullable<string>;
    orientation?: Nullable<string[]>;
    outterSquareSpace?: Nullable<number>;
    outterSquareSpaceFrom?: Nullable<number>;
    outterSquareSpaceTo?: Nullable<number>;
    priceFrom?: Nullable<number>;
    priceTo?: Nullable<number>;
    semiInnerSquareSpaceFrom?: Nullable<number>;
    semiInnerSquareSpaceTo?: Nullable<number>;
    services?: Nullable<string[]>;
    spacesNumberFrom?: Nullable<number>;
    spacesNumberTo?: Nullable<number>;
    tipology?: Nullable<string[]>;
    neighborhoodType?: Nullable<string>;
    totalBuiltSquareSpaceFrom?: Nullable<number>;
    totalBuiltSquareSpaceTo?: Nullable<number>;
    totalSquareSpaceFrom?: Nullable<number>;
    totalSquareSpaceTo?: Nullable<number>;
    type?: Nullable<string[]>;
    secondaryTitle?: Nullable<string>;
}

export class PropertyTypeInput {
    name: string;
    states?: Nullable<string[]>;
}

export class RoleInput {
    name: string;
    description: string;
}

export class ServiceInput {
    name: string;
    icon?: Nullable<string>;
    types?: Nullable<string[]>;
}

export class SlideInput {
    description?: Nullable<string>;
    oldImage?: Nullable<ImageInput>;
    image?: Nullable<CreateImageInput>;
    link?: Nullable<string>;
    name?: Nullable<string>;
    title?: Nullable<string>;
}

export class SliderInput {
    slides?: Nullable<SlideInput[]>;
}

export class UpdateSliderInput {
    id?: Nullable<string>;
    slides?: Nullable<SlideInput[]>;
}

export class UserInput {
    email: string;
    firstName?: Nullable<string>;
    id: string;
    lastName?: Nullable<string>;
    newPassword?: Nullable<string>;
    officePhone?: Nullable<number>;
    password?: Nullable<string>;
    phone?: Nullable<number>;
    picture?: Nullable<CreateImageInput>;
    oldPicture?: Nullable<ImageInput>;
    refreshToken?: Nullable<string>;
    role?: Nullable<string>;
    username?: Nullable<string>;
}

export class ZoneInput {
    name: string;
}

export class Amenity {
    __typename?: 'Amenity';
    id?: Nullable<string>;
    name: string;
    icon?: Nullable<string>;
    types?: Nullable<PropertyType[]>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract amenities(): Nullable<Amenity>[] | Promise<Nullable<Amenity>[]>;

    abstract amenity(id: string): Nullable<Amenity> | Promise<Nullable<Amenity>>;

    abstract contacts(): Nullable<Contact>[] | Promise<Nullable<Contact>[]>;

    abstract contact(id: string): Nullable<Contact> | Promise<Nullable<Contact>>;

    abstract entrepreneurships(associatedZone?: Nullable<string>): Nullable<Entrepreneurship>[] | Promise<Nullable<Entrepreneurship>[]>;

    abstract entrepreneurship(id: string): Nullable<Entrepreneurship> | Promise<Nullable<Entrepreneurship>>;

    abstract features(): Nullable<Feature>[] | Promise<Nullable<Feature>[]>;

    abstract feature(id: string): Nullable<Feature> | Promise<Nullable<Feature>>;

    abstract generalConfigurations(): Nullable<Nullable<GeneralConfiguration>[]> | Promise<Nullable<Nullable<GeneralConfiguration>[]>>;

    abstract generalConfiguration(id: string): Nullable<GeneralConfiguration> | Promise<Nullable<GeneralConfiguration>>;

    abstract grids(): Nullable<Grid>[] | Promise<Nullable<Grid>[]>;

    abstract grid(id: number): Nullable<Grid> | Promise<Nullable<Grid>>;

    abstract homeConfigurations(): Nullable<HomeConfiguration>[] | Promise<Nullable<HomeConfiguration>[]>;

    abstract homeConfiguration(id: string): Nullable<HomeConfiguration> | Promise<Nullable<HomeConfiguration>>;

    abstract images(): Nullable<Image>[] | Promise<Nullable<Image>[]>;

    abstract image(id: string): Nullable<Image> | Promise<Nullable<Image>>;

    abstract imagesByProperty(propertyId: string): Nullable<Image>[] | Promise<Nullable<Image>[]>;

    abstract neighborhoods(associatedEntrepreneurship?: Nullable<string>): Nullable<Neighborhood>[] | Promise<Nullable<Neighborhood>[]>;

    abstract neighborhood(id: string): Nullable<Neighborhood> | Promise<Nullable<Neighborhood>>;

    abstract owners(): Nullable<Owner>[] | Promise<Nullable<Owner>[]>;

    abstract owner(id: string): Nullable<Owner> | Promise<Nullable<Owner>>;

    abstract id(): Nullable<number> | Promise<Nullable<number>>;

    abstract home(): Nullable<Home> | Promise<Nullable<Home>>;

    abstract properties(filters?: Nullable<PropertyFiltersInput>, first?: Nullable<number>, after?: Nullable<string>): PropertyResponse | Promise<PropertyResponse>;

    abstract property(id: string): Nullable<Property> | Promise<Nullable<Property>>;

    abstract propertyTypes(): PropertyType[] | Promise<PropertyType[]>;

    abstract propertyType(id: string): PropertyType | Promise<PropertyType>;

    abstract roles(): Nullable<Role>[] | Promise<Nullable<Role>[]>;

    abstract role(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract services(): Nullable<Service>[] | Promise<Nullable<Service>[]>;

    abstract service(id: string): Nullable<Service> | Promise<Nullable<Service>>;

    abstract sliders(): Nullable<Slider>[] | Promise<Nullable<Slider>[]>;

    abstract slider(id: string): Nullable<Slider> | Promise<Nullable<Slider>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract zones(): Nullable<Zone>[] | Promise<Nullable<Zone>[]>;

    abstract zone(id: string): Nullable<Zone> | Promise<Nullable<Zone>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createAmenity(amenityInput?: Nullable<AmenityInput>): Nullable<Amenity> | Promise<Nullable<Amenity>>;

    abstract updateAmenity(id: string, amenityInput?: Nullable<AmenityInput>): Nullable<Amenity> | Promise<Nullable<Amenity>>;

    abstract deleteAmenity(id: string): Nullable<Amenity> | Promise<Nullable<Amenity>>;

    abstract login(authInput: AuthInput): Tokens | Promise<Tokens>;

    abstract logout(user?: Nullable<UserInput>): Nullable<string> | Promise<Nullable<string>>;

    abstract googleLogin(): Nullable<Tokens> | Promise<Nullable<Tokens>>;

    abstract refresh(refreshInput: RefreshInput): Tokens | Promise<Tokens>;

    abstract updateSession(user: UserInput, refreshInput: RefreshInput): Tokens | Promise<Tokens>;

    abstract register(userInput: RegisterUserInput): Nullable<Tokens> | Promise<Nullable<Tokens>>;

    abstract createContact(createContactInput: ContactInput): Contact | Promise<Contact>;

    abstract updateContact(id: string, updateContactInput: ContactInput): Contact | Promise<Contact>;

    abstract deleteContact(id: string): Nullable<Contact> | Promise<Nullable<Contact>>;

    abstract createEntrepreneurship(entrepreneurshipInput: EntrepreneurshipInput): Entrepreneurship | Promise<Entrepreneurship>;

    abstract updateEntrepreneurship(id: string, entrepreneurshipInput: EntrepreneurshipInput): Entrepreneurship | Promise<Entrepreneurship>;

    abstract deleteEntrepreneurship(id: string): Nullable<Entrepreneurship> | Promise<Nullable<Entrepreneurship>>;

    abstract createFeature(featureInput: FeatureInput): Feature | Promise<Feature>;

    abstract updateFeature(id: string, featureInput: UpdateFeatureInput): Feature | Promise<Feature>;

    abstract deleteFeature(id: string): Nullable<Feature> | Promise<Nullable<Feature>>;

    abstract createGeneralConfiguration(generalConfigurationInput: GeneralConfigurationInput): GeneralConfiguration | Promise<GeneralConfiguration>;

    abstract updateGeneralConfiguration(generalConfigurationInput: GeneralConfigurationInput): GeneralConfiguration | Promise<GeneralConfiguration>;

    abstract deleteGeneralConfiguration(id: string): Nullable<GeneralConfiguration> | Promise<Nullable<GeneralConfiguration>>;

    abstract createGrid(gridInput: GridInput): Grid | Promise<Grid>;

    abstract updateGrid(gridInput: GridInput): Grid | Promise<Grid>;

    abstract deleteGrid(id: number): Nullable<Grid> | Promise<Nullable<Grid>>;

    abstract createHomeConfiguration(homeConfigurationInput: HomeConfigurationInput): HomeConfiguration | Promise<HomeConfiguration>;

    abstract updateHomeConfiguration(id: string, homeConfigurationInput: UpdateHomeConfigurationInput): Nullable<HomeConfiguration> | Promise<Nullable<HomeConfiguration>>;

    abstract deleteHomeConfiguration(id: string): Nullable<HomeConfiguration> | Promise<Nullable<HomeConfiguration>>;

    abstract createImage(imageInput: CreateImageInput): Image | Promise<Image>;

    abstract createMultipleImages(imagesInput: CreateMultipleImagesInput): Nullable<Image>[] | Promise<Nullable<Image>[]>;

    abstract reorderImages(reorderInput: ReorderImagesInput): Nullable<Image>[] | Promise<Nullable<Image>[]>;

    abstract deleteImage(publicId: string): Nullable<Image> | Promise<Nullable<Image>>;

    abstract createNeighborhood(neighborhoodInput: NeighborhoodInput): Neighborhood | Promise<Neighborhood>;

    abstract updateNeighborhood(id: string, neighborhoodInput: NeighborhoodInput): Neighborhood | Promise<Neighborhood>;

    abstract deleteNeighborhood(id: string): Nullable<Neighborhood> | Promise<Nullable<Neighborhood>>;

    abstract createOwner(ownerInput: OwnerInput): Owner | Promise<Owner>;

    abstract updateOwner(id: string, ownerInput: OwnerInput): Owner | Promise<Owner>;

    abstract deleteOwner(id: string): Nullable<Owner> | Promise<Nullable<Owner>>;

    abstract createHomePage(createHomePageInput: CreateHomePageInput): Home | Promise<Home>;

    abstract createProperty(propertyInput: PropertyInput): Nullable<Property> | Promise<Nullable<Property>>;

    abstract updateProperty(id: string, propertyInput?: Nullable<PropertyInput>): Nullable<Property> | Promise<Nullable<Property>>;

    abstract deleteProperty(id: string): Nullable<Property> | Promise<Nullable<Property>>;

    abstract createPropertyType(propertyTypeInput: PropertyTypeInput): PropertyType | Promise<PropertyType>;

    abstract deletePropertyType(id: string): Nullable<PropertyType> | Promise<Nullable<PropertyType>>;

    abstract createRole(roleInput: RoleInput): Role | Promise<Role>;

    abstract updateRole(roleInput: RoleInput): Role | Promise<Role>;

    abstract deleteRole(id: string): Nullable<Role> | Promise<Nullable<Role>>;

    abstract createService(serviceInput: ServiceInput): Service | Promise<Service>;

    abstract updateService(serviceInput: ServiceInput): Service | Promise<Service>;

    abstract deleteService(id: string): Nullable<Service> | Promise<Nullable<Service>>;

    abstract createSlider(sliderInput: SliderInput): Slider | Promise<Slider>;

    abstract updateSlider(id: string, sliderInput: UpdateSliderInput): Slider | Promise<Slider>;

    abstract deleteSlider(id: string): Nullable<Slider> | Promise<Nullable<Slider>>;

    abstract updateUser(userInput: UserInput): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract createZone(zoneInput: ZoneInput): Zone | Promise<Zone>;

    abstract updateZone(id: string, zoneInput: ZoneInput): Zone | Promise<Zone>;

    abstract deleteZone(id: string): Nullable<Zone> | Promise<Nullable<Zone>>;
}

export class Tokens {
    __typename?: 'Tokens';
    accessToken: string;
    refreshToken: string;
}

export class Contact {
    __typename?: 'Contact';
    id?: Nullable<string>;
    firstName: string;
    lastName: string;
    phone: number;
    email: string;
    message: string;
    subject: string;
}

export class Entrepreneurship {
    __typename?: 'Entrepreneurship';
    id?: Nullable<string>;
    name: string;
    zone?: Nullable<Zone>;
    tokkoId?: Nullable<string>;
}

export class Masterplan {
    __typename?: 'Masterplan';
    description?: Nullable<string>;
    id?: Nullable<string>;
    src?: Nullable<string>;
    title?: Nullable<string>;
}

export class Location {
    __typename?: 'Location';
    description?: Nullable<string>;
    id?: Nullable<string>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    title?: Nullable<string>;
}

export class Feature {
    __typename?: 'Feature';
    attachments?: Nullable<Masterplan[]>;
    code?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    description?: Nullable<string>;
    grid?: Nullable<Grid>;
    highlightedImage?: Nullable<Image>;
    highlightedItems?: Nullable<string[]>;
    id?: Nullable<string>;
    innerState?: Nullable<string>;
    location?: Nullable<Location>;
    masterplan?: Nullable<Masterplan>;
    secondaryDescription?: Nullable<string>;
    secondaryImage?: Nullable<Image>;
    secondarySubtitle?: Nullable<string>;
    secondaryTitle?: Nullable<string>;
    slider?: Nullable<Slider>;
    subtitle?: Nullable<string>;
    template?: Nullable<string>;
    title?: Nullable<string>;
    video?: Nullable<string>;
    tokkoId?: Nullable<string>;
}

export class GeneralConfiguration {
    __typename?: 'GeneralConfiguration';
    address: string;
    copyright: string;
    email: string;
    facebook: string;
    facebookPixel: string;
    gtm: string;
    id?: Nullable<string>;
    instagram: string;
    linkedin: string;
    phone: number;
    whatsapp: number;
}

export class Grid {
    __typename?: 'Grid';
    id: string;
    description?: Nullable<string>;
    slides?: Nullable<Slide[]>;
    title?: Nullable<string>;
}

export class HomeConfiguration {
    __typename?: 'HomeConfiguration';
    id?: Nullable<string>;
    slider?: Nullable<Slider>;
    grid?: Nullable<Grid>;
}

export class Image {
    __typename?: 'Image';
    alt?: Nullable<string>;
    id: string;
    isHighlighted?: Nullable<boolean>;
    publicId: string;
    src?: Nullable<string>;
    order?: Nullable<number>;
    properties?: Nullable<Nullable<Property>[]>;
}

export class Neighborhood {
    __typename?: 'Neighborhood';
    id?: Nullable<string>;
    name: string;
    tokkoId?: Nullable<string>;
    entrepreneurship?: Nullable<Entrepreneurship>;
}

export class Owner {
    __typename?: 'Owner';
    email?: Nullable<string>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    lastName?: Nullable<string>;
    phone?: Nullable<number>;
    properties?: Nullable<Property[]>;
}

export class FeaturedZone {
    __typename?: 'FeaturedZone';
    title: string;
    paragraph?: Nullable<string>;
}

export class FeaturedProperties {
    __typename?: 'FeaturedProperties';
    title: string;
    paragraph?: Nullable<string>;
}

export class Categories {
    __typename?: 'Categories';
    title: string;
    paragraph?: Nullable<string>;
}

export class Home {
    __typename?: 'Home';
    categories?: Nullable<Categories>;
    featuredProperties?: Nullable<FeaturedProperties>;
    featuredZone?: Nullable<FeaturedZone>;
}

export class Property {
    __typename?: 'Property';
    status?: Nullable<string>;
    amenities?: Nullable<Nullable<Amenity>[]>;
    antiquity?: Nullable<number>;
    attachments?: Nullable<Nullable<string>[]>;
    backyardSquareSpace?: Nullable<number>;
    bathroomsAmount?: Nullable<number>;
    bedroomsAmount?: Nullable<number>;
    closeness?: Nullable<string>;
    code?: Nullable<string>;
    commission?: Nullable<number>;
    condition?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    createdBy?: Nullable<User>;
    currency?: Nullable<string>;
    description?: Nullable<string>;
    disposal?: Nullable<string>;
    expenses?: Nullable<number>;
    featured?: Nullable<boolean>;
    floors?: Nullable<number>;
    frontSquareSpace?: Nullable<number>;
    garageAmount?: Nullable<number>;
    geoAddress?: Nullable<string>;
    geoAddressApartment?: Nullable<string>;
    geoAddressBetweenStreet1?: Nullable<string>;
    geoAddressBetweenStreet2?: Nullable<string>;
    geoAddressFloor?: Nullable<string>;
    geoAddressNumber?: Nullable<string>;
    geoCity?: Nullable<Neighborhood>;
    geoLocation?: Nullable<Entrepreneurship>;
    geoNear?: Nullable<string>;
    geoZipCode?: Nullable<string>;
    geoZone?: Nullable<Zone>;
    id?: Nullable<string>;
    images?: Nullable<Nullable<Image>[]>;
    innerSquareSpace?: Nullable<number>;
    innerState?: Nullable<string>;
    isCreditAvaiable?: Nullable<boolean>;
    isDirectionHidden?: Nullable<boolean>;
    isEntrepreneurship?: Nullable<boolean>;
    isHighlighted?: Nullable<boolean>;
    isOcuppied?: Nullable<boolean>;
    isProfessionalAvaiable?: Nullable<boolean>;
    isPublicPrice?: Nullable<boolean>;
    isReplicated?: Nullable<boolean>;
    lat?: Nullable<number>;
    long?: Nullable<number>;
    matterport?: Nullable<string>;
    operation?: Nullable<string>;
    orientation?: Nullable<string>;
    outterSquareSpace?: Nullable<number>;
    owner?: Nullable<Owner>;
    price?: Nullable<number>;
    semiGarageAmount?: Nullable<number>;
    semiInnerSquareSpace?: Nullable<number>;
    services?: Nullable<Nullable<Service>[]>;
    spacesNumber?: Nullable<number>;
    state?: Nullable<string>;
    tipology?: Nullable<string>;
    neighborhoodType?: Nullable<string>;
    title?: Nullable<string>;
    secondaryTitle?: Nullable<string>;
    toilettesAmount?: Nullable<number>;
    totalBuiltSquareSpace?: Nullable<number>;
    totalSquareSpace?: Nullable<number>;
    tour360?: Nullable<string>;
    type?: Nullable<PropertyType>;
    updatedAt?: Nullable<DateTime>;
    videos?: Nullable<Nullable<string>[]>;
}

export class PropertyEdge {
    __typename?: 'PropertyEdge';
    cursor?: Nullable<string>;
    node?: Nullable<Property>;
}

export class PageInfo {
    __typename?: 'PageInfo';
    endCursor?: Nullable<string>;
    hasNextPage?: Nullable<boolean>;
}

export class PropertyResponse {
    __typename?: 'PropertyResponse';
    edges?: Nullable<Nullable<PropertyEdge>[]>;
    pageInfo?: Nullable<PageInfo>;
    totalCount?: Nullable<number>;
}

export class PropertyType {
    __typename?: 'PropertyType';
    id?: Nullable<string>;
    name?: Nullable<string>;
    states?: Nullable<Nullable<string>[]>;
}

export class Role {
    __typename?: 'Role';
    id?: Nullable<string>;
    name: string;
    description: string;
}

export class Service {
    __typename?: 'Service';
    id?: Nullable<string>;
    name?: Nullable<string>;
    icon?: Nullable<string>;
    types?: Nullable<Nullable<PropertyType>[]>;
}

export class Slide {
    __typename?: 'Slide';
    description?: Nullable<string>;
    id: string;
    image?: Nullable<Image>;
    link?: Nullable<string>;
    name?: Nullable<string>;
    title?: Nullable<string>;
}

export class Slider {
    __typename?: 'Slider';
    id: string;
    slides?: Nullable<Slide[]>;
}

export class User {
    __typename?: 'User';
    email: string;
    firstName?: Nullable<string>;
    id: string;
    lastName?: Nullable<string>;
    officePhone?: Nullable<number>;
    phone?: Nullable<number>;
    picture?: Nullable<Image>;
    refreshToken?: Nullable<string>;
    role: Role;
    state?: Nullable<number>;
    username?: Nullable<string>;
}

export class Zone {
    __typename?: 'Zone';
    id?: Nullable<string>;
    name: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
