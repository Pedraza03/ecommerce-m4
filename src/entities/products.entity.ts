import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'PRODUCTS',
})
export class Products{

    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Iphone 15', 
        description: 'Nombre del producto'
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @ApiProperty({
        example: 'El mejor celular del mundo', 
        description: 'Generar una descripcion del producto'
    })
    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    /**
     * @example 142.55
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    /**
     * @example 14
     */
    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

    @ApiHideProperty()
    @Column({
        type: 'text',
        nullable: false,
    })
    imgUrl: string;

    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Categories;
}