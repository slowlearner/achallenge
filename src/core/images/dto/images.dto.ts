import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty()
  uri: string;
  @ApiProperty()
  hits: number;
}

export class CreateImageDto {
  @ApiProperty()
  @IsNotEmpty()
  uri: string;
  owner: string;
}

export class ImageDto {
  @ApiProperty()
  uri: string;
}

export class ImageListDto {
  @ApiProperty()
  limit: number;
}

export class ImageListResponseDto {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  data: ImageDto[];
}
