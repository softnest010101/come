import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException("User already exists");

    const role = await this.prisma.role.findUnique({
      where: { name: dto.roleName },
    });
    if (!role) throw new ConflictException("Role not found");

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: bcrypt.hashSync(dto.password, 10),
        roleId: role.id,
      },
    });

    return { message: "Registered successfully", userId: user.id };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user || !bcrypt.compareSync(dto.password, user.password)) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.role.name,
    });

    return { access_token: token };
  }
}
