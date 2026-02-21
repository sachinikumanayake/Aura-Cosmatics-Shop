import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, imagePath?: string) {
    const catId = Number(dto.categoryId);

    if (isNaN(catId)) {
      throw new BadRequestException('Invalid Category ID');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: catId },
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return this.prisma.product.create({
      data: {
        name: dto.name,
        price: Number(dto.price),
        description: dto.description,
        stock: Number(dto.stock),
        image: imagePath,
        category: {
          connect: { id: catId },
        },
      },
      include: {
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  

  async update(id: number, dto: UpdateProductDto, imagePath?: string) {
    const { categoryId, price, stock, ...rest } = dto;

    return this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        ...(price && { price: Number(price) }),
        ...(stock && { stock: Number(stock) }),
        image: imagePath ?? undefined,
        ...(categoryId && {
          category: {
            connect: { id: Number(categoryId) },
          },
        }),
      },
      include: { category: true },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}