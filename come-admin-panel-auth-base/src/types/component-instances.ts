interface Page {
  id: number;
  title: string;
  content?: string;
}

interface Component {
  id: number;
  name: string;
  description?: string;
  config?: object;
}

interface ComponentInstanceBase {
  id: number;
  name: string;
  description?: string;
  config?: object;
  tags?: string[];
  notes?: string;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  page?: Page;
  component?: Component;
  owner?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export type ComponentInstance = ComponentInstanceBase & {
  [key: string]: unknown;
};
