import { IsArray, IsBase64, IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class HolidaysDto {
  @IsBoolean()
  isStarted: boolean;
  @IsString()
  operation: string;
  @IsArray()
  readonly users: [];
  @IsArray()
  startUsers: any[];
  @IsDate()
  readonly date: Date;
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsNumber()
  readonly maxPrice: number;
  @IsBase64()
  readonly base64: string;
  @IsString()
  readonly mode: string;
  readonly partyId: string;
}