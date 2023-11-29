import { Request, Response } from "express";
import { ListOrderService } from "../../services/order/ListOrderService";

class ListOrderController {
  async handle(req: Request, res: Response) {
    const sendOrder = new ListOrderService();
    const order = await sendOrder.execute();

    return res.json(order);
  }
}

export { ListOrderController };
