import { IsString } from "class-validator";

export class SettingsPostDto {
  @IsString()
  readonly operation:string;
}