import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 📌 ყველა მომხმარებლის სიის მიღება (როლების ჩათვლით)
   */
  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { role: true }, // მომხმარებლის როლის დაბრუნება
    });
  }

  /**
   * 📌 ახალი მომხმარებლის შექმნა (პაროლის დაშიფვრით)
   */
  async createUser(data: { email: string; password: string; role: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: {
          connect: { name: data.role }, // ვუკავშირებთ როლს სახელით
        },
      },
    });
  }

  /**
   * 📌 მომხმარებლის განახლება
   */
  async updateUser(id: number, data: { email?: string; password?: string; role?: string }) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = await bcrypt.hash(data.password, 10);
    if (data.role) updateData.role = { connect: { name: data.role } };

    return this.prisma.user.update({ where: { id }, data: updateData });
  }

  /**
   * 📌 მომხმარებლის წაშლა
   */
  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
