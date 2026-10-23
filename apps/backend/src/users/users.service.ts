import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserRequest } from "./dto/create-user.request";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<any> {
    return this.prisma.db.orm.public.User.create({
      email: data.email,
      password: await bcrypt.hash(data.password, 10)
    });
  }
}
