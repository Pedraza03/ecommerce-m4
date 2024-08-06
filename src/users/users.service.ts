import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDTO } from './dtos/users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

    async getUsers(page:number, limit:number) {
        let users = await this.usersRepository.find()
        const start = (page - 1) * limit
        const end = start + +limit
        users = users.slice(start,end)

        return users.map(({password, admin, ...user }) => user)
    }

    async getUserId(id: string) {
        const user = await this.usersRepository.findOne({
            where: {id},
            relations: {
                orders: true,
            }
        })
        if (!user) {
            return 'Ese usuario no existe';
        }
        const {password, admin, ... userPassword} = user;

        return userPassword;
    }

    async addUser(user: Partial<Users>){
        const newUser = await this.usersRepository.save(user);

        const {password, admin, ... userPassword} = newUser;
        return userPassword
    }

    async updateUser(id: string, user: Partial<Users>){
        await this.usersRepository.update(id,user);

        const updateUser = await this.usersRepository.findOneBy({id})
        const {password, admin, ... userPassword} = updateUser;

        return userPassword
    }

    async deleteUser(id: string){
        const user = await this.usersRepository.findOneBy({id})
        this.usersRepository.remove(user)

        const {password, admin, ... userPassword} = user;
        return userPassword

    }

    async getUserByEmail(email: string){
        return await this.usersRepository.findOneBy({email})
    }

}
