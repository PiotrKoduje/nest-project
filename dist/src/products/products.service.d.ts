import { Product } from './../db';
export declare class ProductsService {
    getAll(): Product[];
    getById(id: Product['id']): Product | null;
    deleteById(id: Product['id']): void;
}
