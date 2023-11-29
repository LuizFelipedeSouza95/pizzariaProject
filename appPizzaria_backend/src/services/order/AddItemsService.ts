import prismaClient from "../../prisma";

interface AddItemsRequest{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemsService{
    async execute({ order_id, product_id, amount }: AddItemsRequest){
        const order = await prismaClient.item.create({
            data:{
                order_id,
                product_id,
                amount
            }
        })

        return order;
    }
}

export { AddItemsService }