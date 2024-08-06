import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly filesRepository: FileUploadRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>
    ){}

    async uploadImage(file:Express.Multer.File, productId: string){
        const products = await this.productsRepository.findOneBy({id: productId})

        if(!products){
        throw new NotFoundException('Producto no encontrado')
        }

        const uploadImage = await this.filesRepository.uploadImage(file)
        await this.productsRepository.update(products.id,{
            imgUrl: uploadImage.secure_url
        })

        return await this.productsRepository.findOneBy({
            id: productId
        })
    }
    
}
    