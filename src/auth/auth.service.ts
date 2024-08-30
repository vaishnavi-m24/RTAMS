import { Injectable, UnauthorizedException} from '@nestjs/common';
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
      //const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const adminMobNumber = '9579529955';
    if(user.mobileNumber === adminMobNumber){
      user.role = 'admin';
    }
    else{
      user.role = 'user';
    }
    const payload = { mobileNumber: user.mobileNumber, sub: user.userId, role:user.role };
    return {
      access_token:this.jwtService.sign(payload),
      refresh_token:this.jwtService.sign(payload,{expiresIn:'7d'}),
    };
  }

  async refreshToken(oldToken:string){
    try{
      const payload = this.jwtService.verify(oldToken,{ignoreExpiration:true});
      const newPayload = {mobileNumber:payload.mobileNumber, sub:payload.sub, role:payload.role};
      return{
        access_token:this.jwtService.sign(newPayload),
        refresh_token:this.jwtService.sign(newPayload,{expiresIn:'7d'}),
      };
    } catch(error){
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
