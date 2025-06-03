import { Transform } from 'class-transformer';
import { 
  IsNotEmpty,
  IsString, 
  IsUUID, 
  Length 
} from "class-validator";

export class UpdateOrderDTO {
  @IsUUID()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @Length(2, 40)
  @IsString()
  client: string;

  @Length(5, 80)
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;
}