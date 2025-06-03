import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

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

  create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
    db.products = db.products.map(p => {
      if (p.id === id) return { ...p, ...productData };
      return p;
    });
  }
}
