import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private start;
    constructor(appService: AppService);
    getHealthCheck(): number;
}
