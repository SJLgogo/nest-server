import { IsString } from "class-validator";

export class LoginDot {
    @IsString()
    username: string;
  
    @IsString()
    password: string;
}