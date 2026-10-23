import { Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { CreateUserRequest } from "./dto/create-user.request";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<any> {
    try {
      const { password, ...user } = await this.prisma.db.orm.public.User.create({
        email: data.email,
        password: await bcrypt.hash(data.password, 10)
      });
      return user;
    } catch (error: any) {
      if (error["sqlState"] === "23505") {
        throw new UnprocessableEntityException("Такой e-mail уже существует");
      }
      throw error;
    }
  }
}
