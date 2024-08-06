import {CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()

        const token = request.headers.authorization?.split(' ')[1]

        if(!token){
            throw new UnauthorizedException('token invalido')
        }

        try {
            const secret = process.env.JWT_SECRET
            const user = this.jwtService.verify(token,{secret})

            user.exp= new Date(user.exp * 1000)
            user.iat = new Date(user.iat * 1000)

            // Asociar el rol del usuario 
            if(user.admin){
                user.roles = ['admin']
            } else {
                user.roles = ['user']
            }
            // Se asocian a una reques
            request.user = user;


            return true
        } catch (error) {
            throw new UnauthorizedException('token Invalido')
        }
    
    }
}