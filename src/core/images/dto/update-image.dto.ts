import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty()
  uri: string;
  @ApiProperty()
  hits: number;
}
