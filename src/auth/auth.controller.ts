
import { Controller, Post, Body , HttpException,HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { mobileNumber, password } = loginDto;
    try {
      const user = await this.authService.validateUser(mobileNumber, password);
      if (!user) {
        throw new HttpException('Invalid mobile number or password', HttpStatus.UNAUTHORIZED);
      }
      const token = await this.authService.login(user);
      return { message: 'Login successful', token: token.access_token };
    } catch (error) {
     
        throw new HttpException('Invalid mobile number or password', HttpStatus.UNAUTHORIZED);
      }
    }
  }
  


