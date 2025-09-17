import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CreatedByGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
