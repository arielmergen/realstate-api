import { PrismaService } from '../../db/prisma.service';
import { ZoneInput, Zone } from '../../entities';
export declare class ZonesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createZoneInput: ZoneInput): Promise<Zone>;
    findAll(): Promise<Zone[]>;
    findOne(id: string): Promise<Zone | null>;
    update(id: string, updateZoneInput: ZoneInput): Promise<Zone>;
    delete(id: string): Promise<Zone>;
}
