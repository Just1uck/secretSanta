import { IsString } from "class-validator";

export class SettingsPutDto {
  @IsString()
  readonly firstname:string;
  @IsString()
  readonly secondname:string
  @IsString()
  readonly userAvatar:string
  @IsString()
  readonly id:string
}