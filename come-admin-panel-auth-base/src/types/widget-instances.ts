interface Widget {
  id: number;
  name: string;
  description?: string;
}

interface Page {
  id: number;
  title: string;
  content?: string;
}

interface WidgetInstanceBase {
  id: number;
  name: string;
  description?: string;
  config?: object;
  tags?: string[];
  notes?: string;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  widget?: Widget;
  page?: Page;
}

export type WidgetInstance = WidgetInstanceBase & {
  [key: string]: unknown;
};
