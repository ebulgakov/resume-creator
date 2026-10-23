import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async verifyUser(email: string, inputPassword: string) {
    try {
      const { password, ...user } = await this.usersService.getUser({ email });
      const isAuth = await bcrypt.compare(inputPassword, password);
      if (!isAuth) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException("Логин или пароль не правильный");
    }
  }
}
