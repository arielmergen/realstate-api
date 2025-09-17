import { ZonesService } from './zones.service';
import { ZoneInput, Zone } from '../../entities';
export declare class ZonesResolver {
    private readonly zoneService;
    constructor(zoneService: ZonesService);
    create(createZoneInput: ZoneInput): Promise<Zone>;
    findAll(): Promise<Zone[]>;
    findOne(id: string): Promise<Zone | null>;
    update(id: string, updateZoneInput: ZoneInput): Promise<Zone>;
    delete(id: string): Promise<Zone>;
}
