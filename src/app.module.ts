import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RegistrationModule } from "./registration/registration.module";
import { MongooseModule } from "@nestjs/mongoose";
import { LoginModule } from "./login/login.module";
import { IsTokenRightMiddleware } from "./middleware/is-token-right.middleware";
import { JwtModule } from "@nestjs/jwt";
import { HolidaysModule } from './holidays/holidays.module';

@Module({
  imports: [
    RegistrationModule,
    MongooseModule.forRoot("mongodb+srv://just1uck:nmBPLG4413wQ@cluster0.7cov8zl.mongodb.net/?retryWrites=true&w=majority"),
    LoginModule,
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    HolidaysModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
      .apply(IsTokenRightMiddleware)
      .forRoutes({path:'holidays', method: RequestMethod.GET})
  }
}
