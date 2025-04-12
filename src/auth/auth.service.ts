import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });
    if (!user) return null;

    const passwordValid = bcrypt.compareSync(dto.password, user.password);
    if (!passwordValid) return null;

    return this.generateToken(user.id, user.email, user.role.name);
  }

  generateToken(userId: number, email: string, role: string) {
    const payload = { userId, email, role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
