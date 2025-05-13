export type CalendarConfig = {
  showWeekends: boolean;
  startHour: number;
  endHour: number;
};

export type Field = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};

export type FormConfig = {
  fields: Field[];
  validation: boolean;
  submitEndpoint: string;
};

export type ChartType = "bar" | "line" | "pie";

export type ChartDataPoint = {
  label: string;
  value: number;
};

export type ChartOptions = {
  colorScheme?: string;
  showLegend?: boolean;
};

export type ChartConfig = {
  type: ChartType;
  data: ChartDataPoint[];
  options?: ChartOptions;
};

export type ChatBotConfig = {
  welcomeMessage: string;
  model: string;
};

export type CalculatorConfig = {
  formula: string;
  variables: Record<string, number>;
};

export type TableRow = Record<string, string | number | boolean>;

export type TableConfig = {
  columns: string[];
  rows: TableRow[];
  pagination: boolean;
  sortable: boolean;
};

export type ConditionConfig = {
  if: string;
  then: string;
  else: string;
};
