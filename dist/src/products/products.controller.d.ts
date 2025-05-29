import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAll(): any;
    getById(id: string): import("../db").Product;
    deleteById(id: string): {
        success: boolean;
    };
}
