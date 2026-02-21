import {Controller,Get,Post,Body,Patch,Param,Delete,UseGuards,UseInterceptors,UploadedFile} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    const productData = {
      ...dto,
      price: Number(dto.price),
      stock: Number(dto.stock),
      categoryId: Number(dto.categoryId),
    };

    const imagePath = file ? `/uploads/${file.filename}` : undefined;
    return this.productService.create(productData, imagePath);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @Body() dto: any,
    @UploadedFile() file: Express.Multer.File
  ) {
    const updateData = {
      ...dto,
      price: dto.price ? Number(dto.price) : undefined,
      stock: dto.stock ? Number(dto.stock) : undefined,
      categoryId: dto.categoryId ? Number(dto.categoryId) : undefined,
    };

    const imagePath = file ? `/uploads/${file.filename}` : undefined;
    return this.productService.update(+id, updateData, imagePath);
  }
 

  @Get(':id')
  findOne(@Param ('id') id: number){
    return this.productService.findOne(+id)
  }

  @Get()
  findAll() {
    return this.productService.findAll()
  }
  



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(+id);
  }


}