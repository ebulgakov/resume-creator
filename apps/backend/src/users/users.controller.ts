import { Body, Controller, Inject, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserRequest } from "./dto/create-user.request";

@Controller("users")
export class UsersController {
  constructor(@Inject(UsersService) private readonly usersService: UsersService) {}
  @Post()
  createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }
}
