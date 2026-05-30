import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DiagnoseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  symptoms!: string;
}
