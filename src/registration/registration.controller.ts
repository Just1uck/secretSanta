import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateRegisterDto } from "./dto/create-register.dto";
import { RegistrationService } from "./registration.service";
import { Register } from "./schemas/register.schema";
import { LoginService } from "../login/login.service";
import { Response } from "express";

@Controller("registration")
export class RegistrationController {

  constructor(private readonly userService: RegistrationService,
              private readonly loginService: LoginService
  ) {
  }

  @Get()
  getAll(): Promise<Register[]> {
    return this.userService.getAll();
  }

  @Put()
  async getAssistantWish(
    @Body() body
  ): Promise<any> {
    return this.userService.getById(body);
  }

  @Post()
  async create(
    @Body() createRegisterDto: CreateRegisterDto,
    @Res() res: Response
  ): Promise<any> {
    const newUser = await this.userService.create(createRegisterDto);
    if (newUser === false) {
      return res.status(HttpStatus.FORBIDDEN).send({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Заповніть усі поля"
      });
    } else if (newUser === "Email has been registered") {
      return res.status(HttpStatus.FORBIDDEN).send({
        statusCode: HttpStatus.FORBIDDEN,
        message: "Такий e-mail вже зареєстрован"
      });
    } else {
      const token = this.loginService.generateAccesToken(newUser._id, newUser.role);
      res.cookie("userToken", token);
      res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: newUser,
        token
      });
      return res
    }
  }
}
