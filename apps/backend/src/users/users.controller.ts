import { Body, Controller, Inject, Post, UseInterceptors } from "@nestjs/common";
import { NoFilesInterceptor } from "@nestjs/platform-express";
import { UsersService } from "./users.service";
import { CreateUserRequest } from "./dto/create-user.request";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(NoFilesInterceptor())
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
