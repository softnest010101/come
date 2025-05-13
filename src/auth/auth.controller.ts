import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBody, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: "User registered" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "JWT token returned" })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
