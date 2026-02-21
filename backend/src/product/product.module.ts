import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,  
    JwtModule       
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService] 
})
export class ProductModule {}
