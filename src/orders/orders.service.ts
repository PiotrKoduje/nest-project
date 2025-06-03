import { Injectable, NotFoundException } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {

  getAll(): Order[] {
    return db.orders;
  }

  getById(id: Order['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }

  deleteById(id: Order['id']): void {
    db.orders = db.orders.filter(o => o.id !== id);
  }

  create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  updateById(id: Order['id'], productData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map(o => {
      if (o.id === id) return { ...o, ...productData }
      return o;
    });
  }
}
