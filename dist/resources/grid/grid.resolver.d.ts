import { GridInput, Grid, UpdateGridInput } from '../../entities';
import { GridService } from './grid.service';
export declare class GridResolver {
    private readonly gridService;
    constructor(gridService: GridService);
    create(createGridInput: GridInput): Promise<Grid>;
    findAll(): Promise<Grid[]>;
    findOne(id: string): Promise<Grid | null>;
    update(id: string, updateGridInput: UpdateGridInput): Promise<Grid>;
    delete(id: string): Promise<Grid>;
}
