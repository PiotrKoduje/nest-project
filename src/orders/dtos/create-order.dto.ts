import { Transform } from 'class-transformer';
import { 
  IsNotEmpty,
  IsString, 
  IsUUID, 
  Length 
} from "class-validator";

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;
}