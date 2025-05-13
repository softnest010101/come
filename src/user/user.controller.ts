import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";

interface AuthRequest extends Request {
  user: { id: number };
}

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  @ApiResponse({ status: 200, description: "Get current user's profile" })
  getMe(@Req() req: AuthRequest) {
    return this.userService.getMe(req.user.id);
  }
}
