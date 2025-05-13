import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  Page,
  Component,
  WidgetInstance,
  Prisma,
  Project,
} from "@prisma/client";

@Injectable()
export class DuplicationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 🔁 Clone an entire project (including nested pages, components, widgets)
   */
  async duplicateProject(projectId: number): Promise<Project> {
    const original = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        pages: {
          include: {
            components: true,
            widgetInstances: true,
          },
        },
      },
    });

    if (!original) throw new NotFoundException("Project not found");

    const newProject = await this.prisma.project.create({
      data: {
        name: `${original.name} Copy`,
        description: original.description ?? undefined,
        ownerId: original.ownerId,
      },
    });

    for (const page of original.pages) {
      const newPage = await this.prisma.page.create({
        data: {
          name: `${page.name} Copy`,
          description: page.description ?? undefined,
          ownerId: page.ownerId,
          projectId: newProject.id,
        },
      });

      await Promise.all([
        ...page.components.map((component) =>
          this.prisma.component.create({
            data: {
              name: component.name,
              description: component.description ?? undefined,
              config: component.config as Prisma.InputJsonValue,
              ownerId: component.ownerId,
              pageId: newPage.id,
            },
          }),
        ),
        ...page.widgetInstances.map((widget) =>
          this.prisma.widgetInstance.create({
            data: {
              name: widget.name,
              description: widget.description ?? undefined,
              config: widget.config as Prisma.InputJsonValue,
              ownerId: widget.ownerId,
              pageId: newPage.id,
              type: widget.type ?? "duplicated", // ✅ დამატებულია სავალდებულო ველი
            },
          }),
        ),
      ]);
    }

    return newProject;
  }

  /**
   * 🔁 Clone a single page (including its components and widgetInstances)
   */
  async duplicatePage(pageId: number): Promise<Page> {
    const original = await this.prisma.page.findUnique({
      where: { id: pageId },
      include: {
        components: true,
        widgetInstances: true,
      },
    });

    if (!original) throw new NotFoundException("Page not found");

    const newPage = await this.prisma.page.create({
      data: {
        name: `${original.name} Copy`,
        description: original.description ?? undefined,
        ownerId: original.ownerId,
        projectId: original.projectId ?? undefined,
      },
    });

    await Promise.all([
      ...original.components.map((component) =>
        this.prisma.component.create({
          data: {
            name: component.name,
            description: component.description ?? undefined,
            config: component.config as Prisma.InputJsonValue,
            ownerId: component.ownerId,
            pageId: newPage.id,
          },
        }),
      ),
      ...original.widgetInstances.map((widget) =>
        this.prisma.widgetInstance.create({
          data: {
            name: widget.name,
            description: widget.description ?? undefined,
            config: widget.config as Prisma.InputJsonValue,
            ownerId: widget.ownerId,
            pageId: newPage.id,
            type: widget.type ?? "duplicated", // ✅ დამატებულია სავალდებულო ველი
          },
        }),
      ),
    ]);

    return newPage;
  }
}
