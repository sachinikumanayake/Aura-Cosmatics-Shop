import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    const total = dto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    return this.prisma.order.create({
      data: {
        userId: userId,
        address: dto.address,
        phone: dto.phone,
        total: total,
        items: {
          create: dto.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: { product: true }, 
        },
      },
    });
  }

  
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } }, 
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' }, 
    });
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        items: { include: { product: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: { status: updateOrderDto.status }, 
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}