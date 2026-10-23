import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserRequest {
  @IsEmail()
  email: string | undefined;
  @IsStrongPassword()
  password: string | undefined;
}
