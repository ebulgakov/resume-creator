import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async verifyUser(email: string, password: string) {}
}
