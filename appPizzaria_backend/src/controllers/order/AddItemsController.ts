import { Request, Response } from "express";
import { AddItemsService } from "../../services/order/AddItemsService";

class AddItemsController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body;

    const addItemsService = new AddItemsService();

    const order = await addItemsService.execute({
      order_id,
      product_id,
      amount,
    });

    return res.json(order);
  }
}

export { AddItemsController };
