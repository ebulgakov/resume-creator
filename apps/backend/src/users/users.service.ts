import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRequest } from "./dto/create-user.request";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserRequest): Promise<any> {
    await this.prisma.db.orm.public.User.create({
      data: { ...data }
    });
  }
}
