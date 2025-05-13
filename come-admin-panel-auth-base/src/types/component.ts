interface ComponentBase {
  id: number;
  name: string;
  description?: string;
  notes?: string;
  tags?: string[];
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  page?: {
    id: number;
    title: string;
  };
  owner?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export type Component = ComponentBase & {
  [key: string]: unknown;
};
