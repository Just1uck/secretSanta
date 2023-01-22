import { Module } from '@nestjs/common';
import { HolidaysController } from './holidays.controller';
import { HolidaysService } from './holidays.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Holidays, HolidaysSchema } from "./schemas/holidays.schema";

@Module({
  controllers: [HolidaysController],
  providers: [HolidaysService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Holidays.name,
        schema: HolidaysSchema
      }
    ])
  ]
})
export class HolidaysModule {}
