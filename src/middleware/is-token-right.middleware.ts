import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class IsTokenRightMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {
  }

  use(req: any, res: any, next: () => void) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.cookie.split("=")[1];
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизирован" });
      }
      req.user = this.jwtService.verify(token);
      req.user.userToken = token;
      next();
    } catch (e) {
      return res.status(403).json({ message: "Пользователь не авторизирован" });
    }
  }
}
