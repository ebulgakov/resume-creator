import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import type { Response } from "express";
import * as bcrypt from "bcrypt";
import ms from "ms";
import { ConfigService } from "@nestjs/config";
import type { TokenPayload } from "./token-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}
  // TODO: Fix type
  async login(user: any, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() + ms(this.configService.getOrThrow<string>("JWT_EXPIRATION"))
    );

    const tokenPayload: TokenPayload = {
      userId: user.id
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie("Authentication", token, {
      secure: true,
      httpOnly: true,
      expires
    });

    return { tokenPayload };
  }

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
