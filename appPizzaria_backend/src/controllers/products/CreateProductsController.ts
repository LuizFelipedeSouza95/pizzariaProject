import { Request, Response } from "express";
import { CreateProductsService } from "../../services/products/CreateProductsService";

class CreateProductsController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    
    const createProductsService = new CreateProductsService();

    if(!req.file){
        throw new Error("error upload file")
    } else {

        const { originalname, filename: banner} = req.file;
        const product = await createProductsService.execute({
            name,
            price,
            description,
            banner,
            category_id,
          });
      
          return res.json(product);
    }

  }
}

export { CreateProductsController };
