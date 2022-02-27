import { ApiProperty } from '@nestjs/swagger';
import { Image } from '../models/image.model';
export class ImageListDto {
  @ApiProperty()
  limit: number;
}

export class ImageListResponseDto {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  data: Image[];
}
