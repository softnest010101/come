interface Component {
  id: number;
  name: string;
  config?: Record<string, unknown>;
}

interface PageBase {
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
  components?: Component[];
}

export type Page = PageBase & {
  [key: string]: unknown;
};
