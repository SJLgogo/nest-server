import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/common/decorator/roles.decorator";
import { Role } from "../enum/role.enum";


/** 只允许具有特定角色的用户访问  */ 
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = new Reflector().getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requireRoles) {
     return true
    }
    const { user } = context.switchToHttp().getRequest()
    return requireRoles.some(role => user.roles?.includes(role))
    }

    
}