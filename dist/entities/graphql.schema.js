"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideInput = exports.ServiceInput = exports.RoleInput = exports.PropertyTypeInput = exports.PropertyFiltersInput = exports.FeatureFilterInput = exports.PropertyInput = exports.TeamMemberInput = exports.OurTeamInput = exports.ValuesBoxInput = exports.OurValuesInput = exports.OurMissionInput = exports.BoxInfoInput = exports.MainBannerAboutInput = exports.AboutInput = exports.FeaturedZoneInput = exports.FeaturedPropertiesInput = exports.CategoriesInput = exports.HomeInput = exports.FavouritesInput = exports.TasacionesInput = exports.MapInfoInput = exports.ContactFormInput = exports.ContactBoxInfoInput = exports.ContactInfoInput = exports.MainBannerInput = exports.CreatePageInput = exports.OwnerInput = exports.NeighborhoodInput = exports.ImageInput = exports.CreateImageInput = exports.UpdateHomeConfigurationInput = exports.HomeConfigurationInput = exports.UpdateGridInput = exports.GridInput = exports.GeneralConfigurationInput = exports.UpdateFeatureInput = exports.FeatureInput = exports.UpdateLocationInput = exports.LocationInput = exports.UpdateMasterplanInput = exports.MasterplanInput = exports.EntrepreneurshipInput = exports.ContactInput = exports.RegisterUserInput = exports.RefreshInput = exports.AuthInput = exports.AmenityInput = exports.RolesName = exports.State = void 0;
exports.Slider = exports.Slide = exports.Service = exports.Role = exports.PropertyType = exports.PropertyResponse = exports.PageInfo = exports.PropertyEdge = exports.Property = exports.Pages = exports.Home = exports.FeaturedZone = exports.FeaturedProperties = exports.Categories = exports.Favourites = exports.MainBannerFavourites = exports.Tasaciones = exports.MainBannerTasaciones = exports.MapInfo = exports.ContactForm = exports.ContactInfo = exports.MainBannerContact = exports.ContactPages = exports.TeamMember = exports.OurTeam = exports.ValueBox = exports.OurValues = exports.OurMission = exports.BoxInfo = exports.MainBannerAbout = exports.About = exports.Owner = exports.Neighborhood = exports.Image = exports.HomeConfiguration = exports.Grid = exports.GeneralConfiguration = exports.Feature = exports.Location = exports.Masterplan = exports.Entrepreneurship = exports.Contact = exports.Tokens = exports.IMutation = exports.IQuery = exports.Amenity = exports.ZoneInput = exports.UserInput = exports.UpdateSliderInput = exports.SliderInput = void 0;
exports.Zone = exports.User = void 0;
var State;
(function (State) {
    State["Vendida"] = "Vendida";
    State["Reservada"] = "Reservada";
    State["Disponible"] = "Disponible";
    State["Alquilada"] = "Alquilada";
})(State = exports.State || (exports.State = {}));
var RolesName;
(function (RolesName) {
    RolesName["Guest"] = "Guest";
    RolesName["Executive"] = "Executive";
    RolesName["Admin"] = "Admin";
    RolesName["Owner"] = "Owner";
})(RolesName = exports.RolesName || (exports.RolesName = {}));
class AmenityInput {
}
exports.AmenityInput = AmenityInput;
class AuthInput {
}
exports.AuthInput = AuthInput;
class RefreshInput {
}
exports.RefreshInput = RefreshInput;
class RegisterUserInput {
}
exports.RegisterUserInput = RegisterUserInput;
class ContactInput {
}
exports.ContactInput = ContactInput;
class EntrepreneurshipInput {
}
exports.EntrepreneurshipInput = EntrepreneurshipInput;
class MasterplanInput {
}
exports.MasterplanInput = MasterplanInput;
class UpdateMasterplanInput {
}
exports.UpdateMasterplanInput = UpdateMasterplanInput;
class LocationInput {
}
exports.LocationInput = LocationInput;
class UpdateLocationInput {
}
exports.UpdateLocationInput = UpdateLocationInput;
class FeatureInput {
}
exports.FeatureInput = FeatureInput;
class UpdateFeatureInput {
}
exports.UpdateFeatureInput = UpdateFeatureInput;
class GeneralConfigurationInput {
}
exports.GeneralConfigurationInput = GeneralConfigurationInput;
class GridInput {
}
exports.GridInput = GridInput;
class UpdateGridInput {
}
exports.UpdateGridInput = UpdateGridInput;
class HomeConfigurationInput {
}
exports.HomeConfigurationInput = HomeConfigurationInput;
class UpdateHomeConfigurationInput {
}
exports.UpdateHomeConfigurationInput = UpdateHomeConfigurationInput;
class CreateImageInput {
}
exports.CreateImageInput = CreateImageInput;
class ImageInput {
}
exports.ImageInput = ImageInput;
class NeighborhoodInput {
}
exports.NeighborhoodInput = NeighborhoodInput;
class OwnerInput {
}
exports.OwnerInput = OwnerInput;
class CreatePageInput {
}
exports.CreatePageInput = CreatePageInput;
class MainBannerInput {
}
exports.MainBannerInput = MainBannerInput;
class ContactInfoInput {
}
exports.ContactInfoInput = ContactInfoInput;
class ContactBoxInfoInput {
}
exports.ContactBoxInfoInput = ContactBoxInfoInput;
class ContactFormInput {
}
exports.ContactFormInput = ContactFormInput;
class MapInfoInput {
}
exports.MapInfoInput = MapInfoInput;
class TasacionesInput {
}
exports.TasacionesInput = TasacionesInput;
class FavouritesInput {
}
exports.FavouritesInput = FavouritesInput;
class HomeInput {
}
exports.HomeInput = HomeInput;
class CategoriesInput {
}
exports.CategoriesInput = CategoriesInput;
class FeaturedPropertiesInput {
}
exports.FeaturedPropertiesInput = FeaturedPropertiesInput;
class FeaturedZoneInput {
}
exports.FeaturedZoneInput = FeaturedZoneInput;
class AboutInput {
}
exports.AboutInput = AboutInput;
class MainBannerAboutInput {
}
exports.MainBannerAboutInput = MainBannerAboutInput;
class BoxInfoInput {
}
exports.BoxInfoInput = BoxInfoInput;
class OurMissionInput {
}
exports.OurMissionInput = OurMissionInput;
class OurValuesInput {
}
exports.OurValuesInput = OurValuesInput;
class ValuesBoxInput {
}
exports.ValuesBoxInput = ValuesBoxInput;
class OurTeamInput {
}
exports.OurTeamInput = OurTeamInput;
class TeamMemberInput {
}
exports.TeamMemberInput = TeamMemberInput;
class PropertyInput {
}
exports.PropertyInput = PropertyInput;
class FeatureFilterInput {
}
exports.FeatureFilterInput = FeatureFilterInput;
class PropertyFiltersInput {
}
exports.PropertyFiltersInput = PropertyFiltersInput;
class PropertyTypeInput {
}
exports.PropertyTypeInput = PropertyTypeInput;
class RoleInput {
}
exports.RoleInput = RoleInput;
class ServiceInput {
}
exports.ServiceInput = ServiceInput;
class SlideInput {
}
exports.SlideInput = SlideInput;
class SliderInput {
}
exports.SliderInput = SliderInput;
class UpdateSliderInput {
}
exports.UpdateSliderInput = UpdateSliderInput;
class UserInput {
}
exports.UserInput = UserInput;
class ZoneInput {
}
exports.ZoneInput = ZoneInput;
class Amenity {
}
exports.Amenity = Amenity;
class IQuery {
}
exports.IQuery = IQuery;
class IMutation {
}
exports.IMutation = IMutation;
class Tokens {
}
exports.Tokens = Tokens;
class Contact {
}
exports.Contact = Contact;
class Entrepreneurship {
}
exports.Entrepreneurship = Entrepreneurship;
class Masterplan {
}
exports.Masterplan = Masterplan;
class Location {
}
exports.Location = Location;
class Feature {
}
exports.Feature = Feature;
class GeneralConfiguration {
}
exports.GeneralConfiguration = GeneralConfiguration;
class Grid {
}
exports.Grid = Grid;
class HomeConfiguration {
}
exports.HomeConfiguration = HomeConfiguration;
class Image {
}
exports.Image = Image;
class Neighborhood {
}
exports.Neighborhood = Neighborhood;
class Owner {
}
exports.Owner = Owner;
class About {
}
exports.About = About;
class MainBannerAbout {
}
exports.MainBannerAbout = MainBannerAbout;
class BoxInfo {
}
exports.BoxInfo = BoxInfo;
class OurMission {
}
exports.OurMission = OurMission;
class OurValues {
}
exports.OurValues = OurValues;
class ValueBox {
}
exports.ValueBox = ValueBox;
class OurTeam {
}
exports.OurTeam = OurTeam;
class TeamMember {
}
exports.TeamMember = TeamMember;
class ContactPages {
}
exports.ContactPages = ContactPages;
class MainBannerContact {
}
exports.MainBannerContact = MainBannerContact;
class ContactInfo {
}
exports.ContactInfo = ContactInfo;
class ContactForm {
}
exports.ContactForm = ContactForm;
class MapInfo {
}
exports.MapInfo = MapInfo;
class MainBannerTasaciones {
}
exports.MainBannerTasaciones = MainBannerTasaciones;
class Tasaciones {
}
exports.Tasaciones = Tasaciones;
class MainBannerFavourites {
}
exports.MainBannerFavourites = MainBannerFavourites;
class Favourites {
}
exports.Favourites = Favourites;
class Categories {
}
exports.Categories = Categories;
class FeaturedProperties {
}
exports.FeaturedProperties = FeaturedProperties;
class FeaturedZone {
}
exports.FeaturedZone = FeaturedZone;
class Home {
}
exports.Home = Home;
class Pages {
}
exports.Pages = Pages;
class Property {
}
exports.Property = Property;
class PropertyEdge {
}
exports.PropertyEdge = PropertyEdge;
class PageInfo {
}
exports.PageInfo = PageInfo;
class PropertyResponse {
}
exports.PropertyResponse = PropertyResponse;
class PropertyType {
}
exports.PropertyType = PropertyType;
class Role {
}
exports.Role = Role;
class Service {
}
exports.Service = Service;
class Slide {
}
exports.Slide = Slide;
class Slider {
}
exports.Slider = Slider;
class User {
}
exports.User = User;
class Zone {
}
exports.Zone = Zone;
//# sourceMappingURL=graphql.schema.js.map