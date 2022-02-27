import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty()
  uri: string;
  @ApiProperty()
  hits: number;
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
