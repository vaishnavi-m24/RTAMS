import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import {Reflector} from '@nestjs/core';
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role === 'admin';
    }
}