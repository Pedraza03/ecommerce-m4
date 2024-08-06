import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json'

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Categories) private categoriesRepository:Repository<Categories>){}
    
    async getCategories(){
        return await this.categoriesRepository.find()
    }

    async addCategories(){
        data?.map(async(element) => {
        await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({name: element.category})
        .orIgnore(`("name") DO NOTHING`)
        .execute()
        })
        return 'Categoria Agregada'
    }
}