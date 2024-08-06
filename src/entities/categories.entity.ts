import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


@Entity({
    name: 'CATEGORIES',
})
export class Categories {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'smartphone', 
        description: 'Nombre de la categoria'
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @ApiHideProperty()
    @OneToMany(() => Products, (products) => products.category)
    @JoinColumn()
    products: Products[];
}