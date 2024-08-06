import { ApiProperty } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";


export class CreateOrderDTO {

    @ApiProperty({
        example: 'Ingresar id de usuario', 
        description: 'Ingreso de id de usuario'
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>;
}