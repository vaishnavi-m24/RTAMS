// import { Injectable, CanActivate,ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// @Injectable()
// export class RolesGuard implements CanActivate{
//     constructor(private readonly reflector: Reflector){}
    
//     canActivate(context:ExecutionContext) :boolean{
//         const roles = this.reflector.get<string[]>('roles',context.getHandler());
//         if(!roles){
//             return true;
//         }
//         const request = context.switchToHttp().getRequest();
//         const user = request.user;
//         return roles.includes(user.role);
//     }
// }

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('No user found');
    }

    return requiredRoles.includes(user.role);
  }
}
