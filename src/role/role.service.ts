import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const exists = await this.prisma.role.findUnique({
      where: { name: dto.name },
    });
    if (exists) throw new ConflictException("Role already exists");

    return this.prisma.role.create({ data: dto });
  }

  async findAll() {
    return this.prisma.role.findMany({ orderBy: { name: "asc" } });
  }
}
