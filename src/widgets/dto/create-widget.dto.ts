export class CreateWidgetDto {
  name: string;
  type: string;
  settings: object;
  projectId?: number;
  templateId?: number;
}
