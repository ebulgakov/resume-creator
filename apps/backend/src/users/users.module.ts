import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController]
})
export class UsersModule {}
