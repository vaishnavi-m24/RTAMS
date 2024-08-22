

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(mobileNumber: string, pass: string): Promise<any> {
    const user = await this.userService.findByMobileNumber(mobileNumber);
    if (user && await bcrypt.compare(pass, user.password)) { // Using bcrypt to compare passwords
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { mobileNumber: user.mobileNumber, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
