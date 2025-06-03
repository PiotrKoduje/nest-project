import { 
  Controller, 
  Get, 
  Param, 
  Delete, 
  Post, 
  Put,
  Body, 
  ParseUUIDPipe
  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { db } from 'src/db';

@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe) id: string) {
    const order = this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe) id: string ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.deleteById(id);
    return { success: true};
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    const doesProdExist = db.products.some(p => p.id === orderData.productId);
    if (!doesProdExist) throw new NotFoundException('Product not found');
    
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() orderData: UpdateOrderDTO
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    const doesProdExist = db.products.some(p => p.id === orderData.productId);
    if (!doesProdExist) 
      throw new NotFoundException('Product not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
