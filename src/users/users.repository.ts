import { Injectable } from "@nestjs/common";


type Users = {
    id: number,
    email: string,
    name: string,
    address: string,
    password: string,
    phone: number,
    county?: string | undefined,
    city?: string | undefined,
}

@Injectable()
export class UsersRepository{
    private users: Users[] = [
        {
            id: 1,
            email: "john.doe@example.com",
            name: "John Doe",
            address: "123 Main St",
            password: "password123",
            phone: 1234567890,
            county: "County A",
            city: "City A"
        },
        {
            id: 2,
            email: "jane.smith@example.com",
            name: "Jane Smith",
            address: "456 Elm St",
            password: "password456",
            phone: 9876543210,
            county: "County B",
            city: "City B"
        },
        {
            id: 3,
            email: "alice.johnson@example.com",
            name: "Alice Johnson",
            address: "789 Oak St",
            password: "password789",
            phone: 1231231234
        },
        {
            id: 4,
            email: "bob.brown@example.com",
            name: "Bob Brown",
            address: "321 Pine St",
            password: "password321",
            phone: 4564564567,
            county: "County C"
        },
        {
            id: 5,
            email: "carol.white@example.com",
            name: "Carol White",
            address: "654 Maple St",
            password: "password654",
            phone: 7897897890,
            city: "City D"
        },
        {
            id: 6,
            email: "dave.jones@example.com",
            name: "Dave Jones",
            address: "987 Birch St",
            password: "password987",
            phone: 3213213210
        },
        {
            id: 7,
            email: "eve.davis@example.com",
            name: "Eve Davis",
            address: "123 Cedar St",
            password: "password1234",
            phone: 6546546543,
            county: "County E",
            city: "City E"
        },
        {
            id: 8,
            email: "frank.miller@example.com",
            name: "Frank Miller",
            address: "456 Spruce St",
            password: "password5678",
            phone: 9879879876
        },
        {
            id: 9,
            email: "grace.wilson@example.com",
            name: "Grace Wilson",
            address: "789 Fir St",
            password: "password91011",
            phone: 1112223333,
            county: "County F"
        },
        {
            id: 10,
            email: "henry.moore@example.com",
            name: "Henry Moore",
            address: "321 Palm St",
            password: "password1213",
            phone: 4445556666,
            city: "City G"
        },
    ];

    getUsers(page: number, limit: number){

        const start = (page - 1) * limit
        const end = start + +limit
        const users = this.users.slice(start,end)
        return users.map(({password, ...users}) => users)
    }

    getUserId(id: string){
        const user = this.users.find((user) => user.id === Number(id))

        const {password, ...usersPassword} = user

        return  usersPassword
    }

    addUser(user:Users){
        const id = this.users.length + 1
        user.id = id
        this.users.push(user)

        const {password, ... usersPassword} = user

        return usersPassword
    }

    updateUser(id: string, user:Users){
        const oldUser = this.users.find((user) => user.id === Number(id))

        if(!oldUser){
            return "Ese usuario no existe"
        }

        const updatedUser = {...oldUser, ...user}
        const index = this.users.findIndex((user) => user.id === Number(id))
        this.users[index] = updatedUser

        const {password, ...userPassword } = updatedUser

        return userPassword

    }

    deleteUser(id: string){
        const index = this.users.findIndex((user) => user.id === Number(id))
        const user = this.users[index]

        this.users.splice(index, 1)

        const {password, ...userPassword } = user

        return userPassword

    }

    gerUserByEmail(email: string){
        return this.users.find((user) => user.email === email)
    }

}