import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Register, RegisterSchema } from "../registration/schemas/register.schema";
import { RegistrationService } from "../registration/registration.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Register.name,
      schema: RegisterSchema
    }]),
    JwtModule.register({ secret: "hard!to-guess_secret" })
  ],
  controllers: [LoginController],
  providers: [LoginService, RegistrationService]
})
export class LoginModule {
}
