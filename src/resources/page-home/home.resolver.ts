import { Args, Query, Resolver } from '@nestjs/graphql';
import { HomeService } from './home.service';
import { CreateHomePageInput, Home } from '../../entities';

@Resolver('Home')
export class HomeResolver {
    constructor(
        private readonly homeService: HomeService
    ){}
    
    @Query('home')
    findAll(): Home{
        return this.homeService.findAll();
    }
    findOne(){

    }
    
    createHomePage(
        @Args('createHomePageInput')
        createHomePageInput : CreateHomePageInput
    ) {
        return this.homeService.createHome(createHomePageInput)
    }
    updateHomePage(){

    }
    removeHomePage(){

    }
}
