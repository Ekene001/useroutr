import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TeamRole } from '../../../../generated/prisma/client.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<TeamRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // No @Roles() decorator → allow all authenticated users
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const merchantId: string = request.user?.id;

    if (!merchantId) {
      throw new ForbiddenException('Authentication required');
    }

    // Find the user's team membership (or check if they are the merchant owner)
    const teamMember = await this.prisma.teamMember.findFirst({
      where: {
        merchantId,
        email: request.user.email,
      },
    });

    if (!teamMember) {
      // If the user is the merchant themselves, treat as OWNER
      const merchant = await this.prisma.merchant.findUnique({
        where: { id: merchantId },
      });

      if (merchant && merchant.email === request.user.email) {
        return requiredRoles.includes(TeamRole.OWNER);
      }

      throw new ForbiddenException('Not a member of this merchant');
    }

    if (!requiredRoles.includes(teamMember.role)) {
      throw new ForbiddenException(
        `Requires one of: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
