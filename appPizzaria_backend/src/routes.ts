import { Router, Request, Response } from "express";
import multer from 'multer';
import { CreateUsercontroller } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductsController } from "./controllers/products/CreateProductsController";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";

import uploadConfig from './config/multer';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { AddItemsController } from "./controllers/order/AddItemsController";
import { RemoveItemsController } from "./controllers/order/RemoveItemsController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post('/users', new CreateUsercontroller().handle);
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle);

//-- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

//-- ROTAS PRODUCTS --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductsController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

//-- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle);

router.post('/order/add', isAuthenticated, new AddItemsController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemsController().handle);

router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };
