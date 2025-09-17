import { CreatePageInput, Pages } from '../../entities';
export declare class PageService {
    private pages;
    findAll(): Pages[];
    createPages(pagesInput: CreatePageInput): Pages;
}
