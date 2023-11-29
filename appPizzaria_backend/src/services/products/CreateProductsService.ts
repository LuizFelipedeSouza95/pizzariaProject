import prismaClient from "../../prisma";

interface ProductsRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string
}

class CreateProductsService{
    async execute({ name, price, description, banner, category_id }: ProductsRequest){
        
        const product = await prismaClient.product.create({
            data:{
                name,
                price,
                description,
                banner,
                category_id
            }
        })

        return product;
    }
}

export { CreateProductsService }