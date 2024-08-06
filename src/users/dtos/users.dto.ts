import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MaxLength, Min, MinLength, Validate } from "class-validator";
import { MarchPassword } from "src/decorators/matchPassword.decoratos";



export class CreateUsersDTO{

    @ApiProperty({
        example: 'Antonio Perez', 
        description: 'El nombre de la persona'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    /**
     * @example antonioperez@gmail.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;


    /**
     * @example Antonio.Perez124#
     */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
            'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    /**
     * @example Antonio.Perez124#
     */
    @IsNotEmpty()
    @Validate(MarchPassword,['password'])
    passwordConfirmation: string;

    @ApiHideProperty()
    @IsEmpty()
    admin?:boolean

    /**
     * @example 123 Main St, Springfield'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * @example 3184965475
     */
    @IsNotEmpty()
    @IsNumber()
    @IsPositive() // Asegura que el número es positivo
    @Min(1000000000) // Asegura que el número tiene al menos 10 dígitos
    phone: number;


    /**
     * @example United States
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /**
     * @example Springfield
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;
}

export class LoginUserDTO extends PickType(CreateUsersDTO, ['email','password']){}