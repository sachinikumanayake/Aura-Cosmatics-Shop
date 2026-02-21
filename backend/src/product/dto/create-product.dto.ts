import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  price: number;

  @IsString()
  description: string;

  @IsOptional()
  image?: any;

  @Type(() => Number)
  stock: number;

  @Type(() => Number)
  categoryId: number;
}