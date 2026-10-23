import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "@/auth/guards/local-auth.guard.ts";
import { CurrentUser } from "@/auth/current-user.decorator.ts";
import type { Response } from "express";
import { AuthService } from "@/auth/auth.service.ts";
import type { Models } from "@/prisma/contract";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(
    @CurrentUser() user: Models.public_User,
    @Res({
      passthrough: true
    })
    response: Response
  ) {
    return this.authService.login(user, response);
  }
}
