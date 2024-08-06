import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDTO, LoginUserDTO } from 'src/users/dtos/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post(`signUp`)
  signUp(@Body() user: CreateUsersDTO){

    const {passwordConfirmation, ...cleanUser} = user;

    return this.authService.signUp(cleanUser)
  }
  @Post('LogIn')
  signIn(@Body() credentials:LoginUserDTO){
    const {email, password} = credentials
    return this.authService.signIn(email, password);
  }

}
