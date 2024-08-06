import { Injectable } from "@nestjs/common";


type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: boolean,
    imgUrl: string,
}

@Injectable()
export class ProductsRepository{
    private products: Product[] = [
        {
            id: 1,
            name: "Laptop",
            description: "A high-performance laptop for all your computing needs.",
            price: 999.99,
            stock: true,
            imgUrl: "https://example.com/laptop.jpg",
        },
        {
            id: 2,
            name: "Smartphone",
            description: "A latest model smartphone with a stunning display.",
            price: 699.99,
            stock: true,
            imgUrl: "https://example.com/smartphone.jpg",
        },
        {
            id: 3,
            name: "Headphones",
            description: "Noise-cancelling over-ear headphones for immersive sound.",
            price: 199.99,
            stock: false,
            imgUrl: "https://example.com/headphones.jpg",
        },
        {
            id: 4,
            name: "Smartwatch",
            description: "A smartwatch to keep track of your fitness and notifications.",
            price: 249.99,
            stock: true,
            imgUrl: "https://example.com/smartwatch.jpg",
        },
        {
            id: 5,
            name: "Tablet",
            description: "A lightweight tablet perfect for reading and browsing.",
            price: 349.99,
            stock: true,
            imgUrl: "https://example.com/tablet.jpg",
        },
        {
            id: 6,
            name: "Camera",
            description: "A digital camera for capturing high-quality photos and videos.",
            price: 549.99,
            stock: false,
            imgUrl: "https://example.com/camera.jpg",
        },
        {
            id: 7,
            name: "Bluetooth Speaker",
            description: "A portable Bluetooth speaker with excellent sound quality.",
            price: 99.99,
            stock: true,
            imgUrl: "https://example.com/speaker.jpg",
        },
        {
            id: 8,
            name: "Gaming Console",
            description: "A next-gen gaming console for the ultimate gaming experience.",
            price: 499.99,
            stock: true,
            imgUrl: "https://example.com/console.jpg",
        },
        {
            id: 9,
            name: "External Hard Drive",
            description: "A 1TB external hard drive for all your storage needs.",
            price: 79.99,
            stock: true,
            imgUrl: "https://example.com/harddrive.jpg",
        },
        {
            id: 10,
            name: "Wireless Mouse",
            description: "A wireless mouse with ergonomic design and long battery life.",
            price: 49.99,
            stock: true,
            imgUrl: "https://example.com/mouse.jpg",
        },
    ];

    getProducts(page: number, limit: number){
        const start = (page - 1) * limit
        const end = start + +limit
        const products = this.products.slice(start,end)
        return products
    }

    getproductsId(id: string){
        const products = this.products.find((product) => product.id === Number(id))
        return  products
    }

    addProducts(products: Product){
        const id = this.products.length + 1
        products.id = id
        this.products.push(products)
        return products
    }

    updateProducts(id: string, products:Product){
        const oldProducts = this.products.find((user) => user.id === Number(id))

        if(!oldProducts){
            return "El Producto no existe"
        }

        const updatedProducts = {...oldProducts, ...products}
        const index = this.products.findIndex((product) => product.id === Number(id))
        this.products[index] = updatedProducts

        return updatedProducts

    }

    deleteProducts(id: string){
        const index = this.products.findIndex((product) => product.id === Number(id))
        const products = this.products[index]

        this.products.splice(index, 1)
        return products

    }

}