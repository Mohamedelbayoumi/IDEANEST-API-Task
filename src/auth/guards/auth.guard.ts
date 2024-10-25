import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('invalid token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      req['userEmail'] = payload.sub;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException(err.message);
    }

    return true;
  }

  private extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
