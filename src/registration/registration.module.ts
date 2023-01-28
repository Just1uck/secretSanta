import { Module } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationController } from "./registration.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Register, RegisterSchema } from "./schemas/register.schema";
import { LoginService } from "../login/login.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [RegistrationService, LoginService],
  controllers: [RegistrationController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Register.name,
        schema: RegisterSchema
      }
    ]),
    JwtModule.register({ secret: "hard!to-guess_secret" })
  ]
})
export class RegistrationModule {
}
