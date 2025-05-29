import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';

@Injectable()
export class ProductsService {
  
  getAll(): Product[] {
    return db.products;
  }

  getById(id: Product['id']): Product | null {
    return db.products.find((p) => p.id === id);
  }

  deleteById(id: Product['id']): void {
    db.products = db.products.filter((p) => p.id !== id);
  }
}
