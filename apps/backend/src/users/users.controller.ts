import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { UsersService } from "./users.service";
import { CreateUserRequest } from "./dto/create-user.request";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard.ts";
import { CurrentUser } from "@/auth/current-user.decorator.ts";
import type { TokenPayload } from "@/auth/token-payload.interface.ts";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(NoFilesInterceptor())
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
