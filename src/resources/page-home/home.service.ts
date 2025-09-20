import { Injectable } from '@nestjs/common';
import { CreateHomePageInput, Home } from '../../entities';

@Injectable()
export class HomeService {
    private pages: Home = 
        {
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
        };


    findAll(): Home{
        return this.pages;
    }

    createHome(_createHomePageInput: CreateHomePageInput) {
        return []
    }
}
