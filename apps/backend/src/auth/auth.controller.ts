import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "@/auth/guards/local-auth.guard.ts";
import { CurrentUser } from "@/auth/current-user.decorator.ts";
import type { Response } from "express";
import { AuthService } from "@/auth/auth.service.ts";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(
    @CurrentUser() user: any, // TODO: Fix type
    @Res({
      passthrough: true
    })
    response: Response
  ) {
    return this.authService.login(user, response);
  }
}
