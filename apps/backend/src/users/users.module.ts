import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
