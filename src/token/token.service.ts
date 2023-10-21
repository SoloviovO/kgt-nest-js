import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import getConfiguration from '../configurations';

@Injectable()
export class TokenService {
  private readonly configurations: ReturnType<typeof getConfiguration>;
  constructor(private readonly jwtService: JwtService) {
    this.configurations = getConfiguration();
  }

  async generateJwtToken(user: any) {
    const payload = { user };

    const token = this.jwtService.sign(payload, {
      secret: this.configurations.jwtSecret,
      expiresIn: this.configurations.jwtExpires,
    });
    return token;
  }
}
