import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';

config();
const { JWT_SECRET, JWT_EXPIRES_IN_SECONDS } = process.env;

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJwtToken(user) {
    const payload = { user };
    const token = this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN_SECONDS,
    });
    return token;
  }
}
