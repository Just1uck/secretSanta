import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, Put } from "@nestjs/common";
import { RegistrationService } from "../registration/registration.service";
import { LoginService } from "./login.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { Response } from "express";
import { WishesDto } from "./dto/wishes.dto";

@Controller("login")
export class LoginController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly loginService: LoginService
  ) {
  }

  @Post()
  async getUser(
    @Body() getUserInfo: LoginUserDto,
    @Res() res: Response
  ): Promise<any> {
    const findUser = await this.registrationService.findOne({
      email: getUserInfo.email
    });
    if (findUser && findUser.password === getUserInfo.password) {
      const token = this.loginService.generateAccesToken(findUser._id, findUser.role);
      res.cookie("userToken", token);
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        message: findUser,
        token
      });
    } else if (findUser) {
      return res.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Не правильный пароль"
      });
    } else {
      return res.status(HttpStatus.NOT_FOUND).send({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Пользователь с таким e-mail не найден"
      });
    }
  }

  @Put()
  async Wishes(@Body() body: WishesDto): Promise<any> {
    const user = await this.registrationService.getById([body.userId])
    const oldWishList = user[0].wishList
    if (body.operation === 'add') {
      return await this.registrationService.getByIdAndUpdate(body.userId,[...oldWishList,{
        title: body.title,
        url: body.url,
        price: body.price,
        priority: body.priority,
      }])
    } else if (body.operation === 'remove') {
      return await this.registrationService.getByIdAndUpdate(body.userId,oldWishList.filter(item=> item.title !== body.title))
    }
  }
}
