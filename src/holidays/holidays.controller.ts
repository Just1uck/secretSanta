import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { HolidaysService } from "./holidays.service";
import { HolidaysDto } from "./dto/holidays.dto";
import { Holidays } from "./schemas/holidays.schema";
import { Request, Response } from "express";

@Controller("holidays")
export class HolidaysController {

  constructor(private readonly holidayService: HolidaysService) {
  }

  @Get()
  async getAll(
    @Req() req,
    @Res() res: Response
  ): Promise<any> {
    res.cookie("userToken", req.user.userToken);
    const holidays = await this.holidayService.getAll();
    return res.status(HttpStatus.OK).send(holidays);
  }

  @Post()
  create(@Body() body: HolidaysDto): Promise<Holidays> {
    if (body.operation === "create") {
      return this.holidayService.create(body);
    } else if (body.operation === "start") {
      return this.holidayService.start(body);
    }

  }

  @Put()
  update(@Body() body: any): Promise<any> {
    return this.holidayService.update(body);
  }
}
