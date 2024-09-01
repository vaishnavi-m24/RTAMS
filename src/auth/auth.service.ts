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
    try{
      const user = await this.userService.findByMobileNumber(mobileNumber);
      console.log('user fetched',user);
      if(!user)
      {
        console.error('User not found');
        return null;
      }
      console.log('pass from db',user.password);

      const isMatch = await bcrypt.compare(pass, user.password);
      if(isMatch){
        return user;
      }
      else{
        console.error('Password mismatch');
        return null;
      }
    }
    catch(error){
      console.error("Error in validation",error);
      throw new UnauthorizedException('validation failed');
    }
  }

  async login(user: any) {
    try{
      const payload = { mobileNumber: user.mobileNumber, sub: user.userId, role:user.role };
    return {
      access_token:this.jwtService.sign(payload),
      refresh_token:this.jwtService.sign(payload,{expiresIn:'7d'}),
    };
    }
    catch(error)
    {
      console.error('Error in login',error);
      throw new UnauthorizedException('Login failed');
    }
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
