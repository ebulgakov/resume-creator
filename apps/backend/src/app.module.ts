import { Module } from "@nestjs/common";
import { createObserveModule } from "@nestjs/observe";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ObserveModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        appKey: configService.getOrThrow("OBSERVE_APP_KEY"),
        appSecret: configService.getOrThrow("OBSERVE_APP_SECRET"),
        serviceId: configService.getOrThrow("OBSERVE_SERVICE_ID")
      }),
      inject: [ConfigService]
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get("NODE_ENV") === "production";

        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: "pino-pretty",
                  options: {
                    singleLine: true
                  }
                },
            level: isProduction ? "info" : "debug"
          }
        };
      },
      inject: [ConfigService]
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
