// 📁 types/widget.ts

export interface Page {
  id: number;
  title: string;
  content?: string;
}

export interface WidgetBase {
  id: number;
  name: string;
  description?: string;
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
  pages?: Page[]; // თუ Widgets შეიძლება დაკავშირებული იყოს გვერდებთან
}

export type Widget = WidgetBase & {
  [key: string]: unknown;
};
