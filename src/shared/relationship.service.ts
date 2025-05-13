import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {
  Project,
  Page,
  Component,
  Widget,
  Template,
  WidgetInstance,
  ComponentInstance,
} from "@prisma/client";

/** Supported models for dynamic relationship mapping */
type PrismaModels = {
  project: Project;
  page: Page;
  component: Component;
  widget: Widget;
  template: Template;
  widgetInstance: WidgetInstance;
  componentInstance: ComponentInstance;
};

export type SupportedModel = keyof PrismaModels;

type PrismaAccessors = {
  [K in SupportedModel]: {
    findUnique: (args: {
      where: { id: number };
    }) => Promise<PrismaModels[K] | null>;
    update: (args: {
      where: { id: number };
      data: any;
    }) => Promise<PrismaModels[K]>;
  };
};

@Injectable()
export class RelationshipService {
  private readonly modelMap: PrismaAccessors;

  constructor(private readonly prisma: PrismaService) {
    this.modelMap = {
      project: {
        findUnique: (args) => this.prisma.project.findUnique(args),
        update: (args) => this.prisma.project.update(args),
      },
      page: {
        findUnique: (args) => this.prisma.page.findUnique(args),
        update: (args) => this.prisma.page.update(args),
      },
      component: {
        findUnique: (args) => this.prisma.component.findUnique(args),
        update: (args) => this.prisma.component.update(args),
      },
      widget: {
        findUnique: (args) => this.prisma.widget.findUnique(args),
        update: (args) => this.prisma.widget.update(args),
      },
      template: {
        findUnique: (args) => this.prisma.template.findUnique(args),
        update: (args) => this.prisma.template.update(args),
      },
      widgetInstance: {
        findUnique: (args) => this.prisma.widgetInstance.findUnique(args),
        update: (args) => this.prisma.widgetInstance.update(args),
      },
      componentInstance: {
        findUnique: (args) => this.prisma.componentInstance.findUnique(args),
        update: (args) => this.prisma.componentInstance.update(args),
      },
    };
  }

  private readonly foreignKeyMap: Record<
    SupportedModel,
    Partial<Record<SupportedModel, string>>
  > = {
    project: {
      page: "projectId",
      component: "projectId",
      widget: "projectId",
      widgetInstance: "projectId",
      componentInstance: "projectId",
    },
    page: {
      component: "pageId",
      widget: "pageId",
      widgetInstance: "pageId",
      componentInstance: "pageId",
    },
    component: {
      componentInstance: "componentId",
      widgetInstance: "componentId",
      widget: "componentId",
    },
    widget: {
      widgetInstance: "widgetId",
    },
    template: {
      page: "templateId",
    },
    widgetInstance: {},
    componentInstance: {},
  };

  /**
   * Automatically resolve the correct update direction and foreign key.
   * Returns which model to update, the foreign key field, and the value.
   */
  private resolveDirectionAndKey(
    modelA: SupportedModel,
    idA: number,
    modelB: SupportedModel,
    idB: number,
  ): {
    updateModel: SupportedModel;
    updateId: number;
    foreignKey: string;
    linkToId: number;
  } {
    const forward = this.foreignKeyMap[modelA]?.[modelB];
    if (forward) {
      return {
        updateModel: modelB,
        updateId: idB,
        foreignKey: forward,
        linkToId: idA,
      };
    }

    const reverse = this.foreignKeyMap[modelB]?.[modelA];
    if (reverse) {
      return {
        updateModel: modelA,
        updateId: idA,
        foreignKey: reverse,
        linkToId: idB,
      };
    }

    throw new BadRequestException(
      `No valid foreign key exists between ${modelA} and ${modelB}`,
    );
  }

  async linkEntities(
    modelA: SupportedModel,
    idA: number,
    modelB: SupportedModel,
    idB: number,
  ) {
    const entityA = await this.modelMap[modelA].findUnique({
      where: { id: idA },
    });
    const entityB = await this.modelMap[modelB].findUnique({
      where: { id: idB },
    });

    if (!entityA || !entityB) {
      throw new NotFoundException(`${modelA} or ${modelB} not found`);
    }

    const { updateModel, updateId, foreignKey, linkToId } =
      this.resolveDirectionAndKey(modelA, idA, modelB, idB);

    return this.modelMap[updateModel].update({
      where: { id: updateId },
      data: { [foreignKey]: linkToId },
    });
  }

  async bulkLinkToSource(
    modelA: SupportedModel,
    idA: number,
    modelB: SupportedModel,
    targetIds: number[],
  ) {
    const entityA = await this.modelMap[modelA].findUnique({
      where: { id: idA },
    });
    if (!entityA) throw new NotFoundException(`${modelA} not found`);

    const { updateModel, foreignKey } = this.resolveDirectionAndKey(
      modelA,
      idA,
      modelB,
      -1, // placeholder, not needed for bulk
    );

    return Promise.all(
      targetIds.map((idB) =>
        this.modelMap[updateModel].update({
          where: { id: idB },
          data: { [foreignKey]: idA },
        }),
      ),
    );
  }

  async linkToSource(
    modelA: SupportedModel,
    idA: number,
    links: { targetModel: SupportedModel; targetId: number }[],
  ) {
    const entityA = await this.modelMap[modelA].findUnique({
      where: { id: idA },
    });
    if (!entityA) throw new NotFoundException(`${modelA} not found`);

    return Promise.all(
      links.map(({ targetModel, targetId }) => {
        const { updateModel, updateId, foreignKey, linkToId } =
          this.resolveDirectionAndKey(modelA, idA, targetModel, targetId);

        return this.modelMap[updateModel].update({
          where: { id: updateId },
          data: { [foreignKey]: linkToId },
        });
      }),
    );
  }
}
