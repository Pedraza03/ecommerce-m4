import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService) {}
    
    async signUp(user: Partial<Users>){

        const { email, password} = user

        const foundUser = await this.usersService.getUserByEmail(email)

        console.log(foundUser)

        if(foundUser){
            throw new BadRequestException('Este usuario ya existe')
        }

        const hashedPassword = await bcrypt.hash(password,10)

        if(!hashedPassword){
            throw new BadRequestException("Error en la Incriptacion")
        }

        return await this.usersService.addUser({
            ...user,
            password: hashedPassword,
        })

    }

    async signIn(email: string, password: string){

        const foundUser = await this.usersService.getUserByEmail(email)

        if(!foundUser){
            throw new BadRequestException("Credenciales Invalidas")
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if(!isPasswordValid){
            throw new BadRequestException ('Credenciales Invalidass')
        }

        const userPayload = {
            id: foundUser.id,
            email: foundUser.email,
            admin: foundUser.admin
        }
        const token = this.jwtService.sign(userPayload)
        const id = userPayload.id
        return{
            message: 'El usuario ha iniciado sesión correctamente',
            id,
            token
        }
    }


}
