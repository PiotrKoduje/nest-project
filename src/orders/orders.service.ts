import { Injectable, BadRequestException } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: { product: true, client: true }
    });
  }

  deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where:  { id }
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    const { productId, clientId } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId}
          }
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  updateById(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Order> {
    const  { productId, clientId } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: {
          connect: { id: productId }
        },
        client: {
          connect: { id: clientId }
        }
      }
    });
  }
}
