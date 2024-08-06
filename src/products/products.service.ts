import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/entities/categories.entity';
import * as data from "../data.json"

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository:Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository:Repository<Categories>        
    ) {}
    async getProducts(page: number, limit: number){
        let products = await this.productsRepository.find({
            relations: {
                category: true,
            }
        })
        const start = (page - 1) * limit
        const end = start + +limit
        products = products.slice(start,end)
        return products
    }

    async getproductsId(id: string) {
        const product = this.productsRepository.findOneBy({ id })

        if(!product){
            return 'Producto no encontrado'
        }
        return product;
    }

    async addProducts(){
        const categories = await this.categoriesRepository.find()
        
        if(!categories){
            return 'Ejecuta el seeder de productos primero'
        }

        data?.map(async (elemet) =>{
            const category = categories.find(
                (category) => category.name === elemet.category
            );
            const product = new Products();
            product.name = elemet.name;
            product.description = elemet.description;
            product.price = elemet.price;
            product.imgUrl = elemet.imgUrl;
            product.stock = elemet.stock;
            product.category = category;

            await this. productsRepository
                .createQueryBuilder()
                .insert()
                .into(Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl','stock'],['name'])
                .execute();
        })
        return 'Producto agregado'
    }

    async updateProducts(id: string, product:Products){
        await this.productsRepository.update(id, product)

        const updateProducts = await this.productsRepository.findOneBy({ id })
        return updateProducts

    }

    async deleteProducts(id: string){
        const product = await this.productsRepository.findOneBy({id})
        this.productsRepository.remove(product)

        return 'Producto Eliminado'

    }
}
