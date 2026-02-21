import {Injectable,NotFoundException,BadRequestException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {

    const existing = await this.prisma.category.findUnique({
      where: { name: dto.name }
    });

    if (existing) {
      throw new BadRequestException('Category already exists');
    }

    return this.prisma.category.create({
      data: { name: dto.name }
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        products: true
      }
    });
  }

  async findOne(id: number) {

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {

    const category = await this.prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.category.update({
      where: { id },
      data: { name: dto.name }
    });
  }

  async remove(id: number) {

    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true }
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.products.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with existing products'
      );
    }

    return this.prisma.category.delete({
      where: { id }
    });
  }
}
