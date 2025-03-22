import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // 📌 მომხმარებლის პროფილის მიღება ID-ით
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  // 📌 მომხმარებლის განახლება
  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
