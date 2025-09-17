import { PageService } from './page.service';
import { Pages, CreatePageInput } from '../../entities';
export declare class PageResolver {
    private readonly pageService;
    constructor(pageService: PageService);
    findAll(): Pages[];
    findOne(): void;
    createPage(createPageInput: CreatePageInput): any;
    updatePage(): void;
    removePage(): void;
}
