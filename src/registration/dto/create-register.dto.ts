import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateRegisterDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly firstname: string;
  @IsNotEmpty()
  readonly secondname: string;
  readonly notificationToken:any
  role: string;
  wishList:[];
  _id: number;
}