import { Injectable } from "@nestjs/common";
import { db, listUsers, type StarterUser } from "./users";

@Injectable()
export class PrismaService {
  readonly db = db;
}
