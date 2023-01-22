import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}
  generateAccesToken (id, roles) {
    const payload = {
      id,
      roles
    }
    return this.jwtService.sign(payload,{expiresIn:"24h"})
  }
  decotedAccessToken(token) {
    return this.jwtService.decode(token)
  }
}
