import prismaClient from "../../prisma";

interface ItemsRequest {
  item_id: string;
}

class RemoveItemsService {
  async execute({ item_id }: ItemsRequest) {
    const order = prismaClient.item.delete({
      where: {
        id: item_id,
      },
    });

    return order;
  }
}

export { RemoveItemsService };
