import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // დარეგისტრირება
  async register(email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: {
          connect: { name: role }, // assuming you have a Role model with 'name' field
        },
      },
    });
  }

  // მომხმარებლის ორთან შედარება
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true }, // ეს ჩატვირთავს დაკავშირებულ როლს
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  // ავტორიზაცია
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role.name, // ეხლა მივმართავთ როლის სახელს
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
