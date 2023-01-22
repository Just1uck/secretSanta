import { IsNumber, IsString, IsUrl } from "class-validator";

export class WishesDto {
  @IsString()
  readonly operation:string
  @IsString()
  readonly title:string;
  @IsUrl()
  readonly url:string;
  @IsNumber()
  readonly price:number;
  @IsNumber()
  readonly priority:number
  userId:number
}