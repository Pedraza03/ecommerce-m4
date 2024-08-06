import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity({
    name:'USERS'
})
export class Users {

    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Antonio Perez', 
        description: 'El nombre de la persona'
    })
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name:string;

    /**
     * @example antonioperez@gmail.com
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    /**
     * @example Antonio.Perez124#
     */
    @Column({
        type: 'text',
        nullable: false,
    })
    password: string;

    @ApiHideProperty()
    @Column({
        type: 'boolean',
        default: false
    })
    admin:boolean;

    /**
     * @example 3184965475
     */
    @Column({
        type: 'bigint',
    })
    phone: number;

    /**
     * @example United States
     */
    @Column({
        type:'varchar',
        length: 50,
    })
    country: string;

    /**
     * @example 123 Main St, Springfield'
     */
    @Column({
        type: 'text'
    })
    address: string;

    /**
     * @example Springfield
     */
    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;


    @ApiHideProperty()
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: 'orders_id'})
    orders: Orders[];
}