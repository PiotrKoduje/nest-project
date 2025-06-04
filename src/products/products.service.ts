import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  
  getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  getExtendedById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id }
    })
  }

  create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.prismaService.product.create({
      data: productData
    });
  }

  updateById(
    id: Product['id'], 
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData
    });
  }
}
