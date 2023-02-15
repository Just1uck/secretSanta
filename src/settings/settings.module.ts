import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Register, RegisterSchema } from "../registration/schemas/register.schema";
import { RegistrationService } from "../registration/registration.service";
import { HolidaysService } from "../holidays/holidays.service";
import { Holidays, HolidaysSchema } from "../holidays/schemas/holidays.schema";

@Module({
  controllers: [SettingsController],
  providers: [SettingsService,RegistrationService,HolidaysService],
  imports: [
    MongooseModule.forFeature([{
      name: Register.name,
      schema: RegisterSchema
    }]),
    MongooseModule.forFeature([
      {
        name: Holidays.name,
        schema: HolidaysSchema
      }
    ])
  ],
})
export class SettingsModule {}
