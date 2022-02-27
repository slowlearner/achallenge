import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsNotEmpty()
  uri: string;
  owner: string;
}
