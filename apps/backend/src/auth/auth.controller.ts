import { Controller, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "@/auth/guards/local-auth.guard.ts";

@Controller("auth")
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login() {}
}
