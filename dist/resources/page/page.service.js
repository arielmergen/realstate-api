"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
let PageService = class PageService {
    constructor() {
        this.pages = [{
                "id": 1,
                "home": {
                    "categories": {
                        "title": "Descubrí todas las categorías",
                        "paragraph": "",
                    },
                    "featuredProperties": {
                        "title": "Propiedades Destacadas",
                        "paragraph": "",
                    },
                    "featuredZone": {
                        "title": "Destacados por Zona",
                        "paragraph": "",
                    },
                },
                "about": {
                    "mainBanner": {
                        "imageUrl": "url",
                        "title": "Sobre Nosotros",
                        "paragraph": "Somos una empresa dedicada a la venta y alquiler de propiedades en la ciudad de Rosario y alrededores."
                    },
                    "boxInfo": {
                        "title": "Conocé Orbita",
                        "paragraph": "Somos un equipo que ofrece una experiencia personalizada de comercialización de inmuebles, basada en el profesionalismo, la calidad del servicio y la confianza de Eidico.Tanto quienes quieran vender su inmueble como quienes busquen adquirir una nueva propiedad desarrollada por Eidico, contarán con el acompañamiento de asesores inmobiliarios que reúnen toda la información necesaria y actualizada, así como una amplia experiencia en el rubro inmobiliario."
                    },
                    "ourMission": {
                        "title": "Nuestra Misión",
                        "paragraph": "Brindar un servicio inmobiliario integral acompañando a nuestros clientes en sus diferentes necesidades, con profesionalismo, profundo conocimiento de los productos y de las condiciones del mercado."
                    },
                    "ourValues": {
                        "box": [{
                                "title": "Integridad",
                                "paragraph": "Buscamos el bien común y la equidad en el trabajo que realizamos. Priorizamos la honestidad y la comunicación con cada cliente, atendiendo sus necesidades y brindando procesos de trabajo transparentes.",
                                "icon": "icon",
                            },
                            {
                                "title": "Trato Personalizado",
                                "paragraph": "Ofrecemos a cada cliente un asesoramiento a su medida, con la fuerte impronta de la calidez humana y de la alegría.",
                                "icon": "icon",
                            },
                            {
                                "title": "Confianza",
                                "paragraph": "Trabajamos en el rubro inmobiliario desde hace 28 años, y contamos con experiencia en el desarrollo de proyectos. Formamos parte del gran equipo de Eidico, y conocemos en profundidad cada uno de los productos comercializados.",
                                "icon": "icon",
                            },
                            {
                                "title": "Profesionalismo",
                                "paragraph": "Con más de 28 años de trayectoria en el rubro inmobiliario, brindamos expertise en el servicio que ofrecemos, trabajando de manera responsable.",
                                "icon": "icon",
                            },
                            {
                                "title": "Experiencia",
                                "paragraph": "Contamos con años de aprendizaje, formación y trabajo en el desarrollo inmobiliario. Conocemos los proyectos que comercializamos en un 100% tras haber formado parte de su desarrollo.",
                                "icon": "icon",
                            }],
                    },
                    "ourTeam": {
                        "title": "Nuestro Equipo Comercial",
                        "paragraph": " ",
                        "teamMember": [
                            {
                                "name": "Ana Lopez Galanes",
                                "email": "alopezgalanes@orbita.com.ar",
                                "phone": "5491153387275",
                            },
                            {
                                "name": "Ana Lopez Galanes",
                                "email": "alopezgalanes@orbita.com.ar",
                                "phone": "5491153387275",
                            }
                        ]
                    }
                },
                "contact": {
                    "mainBanner": {
                        "imageUrl": "url",
                        "title": "Contacto",
                        "paragraph": "Dejanos tu consulta y nos pondremos en contacto a la brevedad."
                    },
                    "contactInfo": {
                        "boxInfo": [
                            {
                                "title": "Email",
                                "paragraph": "info@orbita.com.ar",
                                "icon": "mail"
                            },
                            {
                                "title": "Teléfono",
                                "paragraph": "70793702",
                                "icon": "phone"
                            },
                            {
                                "title": "Dirección",
                                "paragraph": "Av. Agustín García 9501, (1621) Benavídez, Argentina",
                                "icon": "map"
                            }
                        ]
                    },
                    "contactForm": {
                        "title": "Envianos tus consultas",
                        "paragraph": "",
                        "name": "Nombre",
                        "lastName": "Apellido",
                        "email": "Email",
                        "phone": "Teléfono / Whatsapp",
                        "message": "Mensaje / Consulta",
                        "button": "Enviar consulta",
                    },
                    "mapInfo": {
                        "title": "¿Dónde están nuestras oficinas?",
                        "paragraph": "",
                        "latitude": "-432432432",
                        "longitude": "-432432432",
                    }
                },
                "tasaciones": {
                    "mainBanner": {
                        "imageUrl": "url",
                        "title": "Tasaciones",
                        "paragraph": ""
                    },
                    "contactForm": {
                        "title": "¿Querés tasar tu propiedad?",
                        "paragraph": "Dejanos tus datos y te contactamos.",
                        "name": "Nombre",
                        "lastName": "Apellido",
                        "email": "Correo electrónico",
                        "phone": "Teléfono / Whatsapp",
                        "city": "Seleccionar localidad",
                        "message": "Detallar - Barrio / N° de lote + Construido/Apto para construir  Ejemplo: San Sebastian Area 6 lote 55 construido",
                        "button": "Enviar consulta",
                    },
                },
                "favourites": {
                    "mainBanner": {
                        "imageUrl": "url",
                        "title": "Tus propiedades favoritas",
                        "paragraph": "Lo sentimos, no tenes favoritos guardados en tu perfil. Para comenzar, busca el tipo de propiedad y cuando encuentres lo que estas buscando, podes guardarlo haciendo click en el corazón."
                    },
                }
            }];
    }
    findAll() {
        return this.pages;
    }
    createPages(pagesInput) {
        const page = new entities_1.Pages();
        const existingIds = Object.values(this.pages).map(page => page.id).filter(id => id !== undefined && id !== null);
        page.id = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
        const home = pagesInput.home || { categories: {}, featuredProperties: {}, featuredZone: {} };
        const { about, contact, tasaciones, favourites } = pagesInput;
        const createPageInputWithId = {
            id: page.id,
            home,
            about,
            contact,
            tasaciones,
            favourites
        };
        const data = Object.assign(Object.assign({}, page), createPageInputWithId);
        this.pages.push(data);
        return data;
    }
};
PageService = __decorate([
    (0, common_1.Injectable)()
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=page.service.js.map